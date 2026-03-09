import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"

from fastapi import APIRouter, Depends
from api.dependencies import verify_clerk_token
from pydantic import BaseModel
import tempfile
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from docling.document_converter import DocumentConverter
from core.database import get_db
from sqlalchemy.orm import Session
from models.document import Document
from models.document_vectors import DocumentVector
from sentence_transformers import SentenceTransformer
from docling.chunking import HierarchicalChunker
from google import genai
from api.prompt import RAG_PROMPT_TEMPLATE
from core.config import settings


router = APIRouter(dependencies=[Depends(verify_clerk_token)])
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

client = genai.Client(api_key=settings.gemini_api_key)

class SearchQuery(BaseModel):
    query: str
    top_k: int = 2
    document_id: str

@router.get("/secure-hello")
def secure_say_hello():
    return {"message": "Hello! You are authenticated."}

@router.get("/my-profile")
def get_profile(user_data: dict = Depends(verify_clerk_token)):
    return {"message": "Profile data", "data": user_data}

@router.get("/my-documents")
def get_documents(
    profile: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user_id = profile.get("sub")
    documents = db.query(Document).filter(Document.user_id == user_id).all()
    return {"documents": [{"id": doc.id, "filename": doc.filename, "uploaded_date": doc.uploaded_at} for doc in documents]}

@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    profile: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
    ):
    """
    Accepts a file from the frontend, parses it using Docling, 
    and returns the structured output for inspection.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    temp_file_path = ""
    user_id = profile.get("sub")
    try:

        new_doc = Document(
            user_id = user_id,
            filename = file.filename
        )

        db.add(new_doc)
        db.commit()
        db.refresh(new_doc)

        with tempfile.NamedTemporaryFile(delete=False, suffix=f"_{file.filename}") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name

        converter = DocumentConverter()
        result = converter.convert(temp_file_path)

        chunker = HierarchicalChunker()
        chunk_iter = chunker.chunk(result.document)
        
        db_vectors = []
        for chunk in chunk_iter:
            text_content = chunk.text
            
            if not text_content.strip():
                continue
                
            embedding = embedding_model.encode(text_content).tolist()
            
            db_vectors.append(
                DocumentVector(
                    document_id=new_doc.id,
                    content=text_content,
                    embedding=embedding
                )
            )
            
        if db_vectors:
            db.bulk_save_objects(db_vectors)
            db.commit()

        documents = db.query(Document).filter(Document.user_id == user_id).all()
        return {
            "documents": [{"id": doc.id, "filename": doc.filename, "uploaded_date": doc.uploaded_at} for doc in documents]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing document: {str(e)}")
        
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
        file.file.close()

@router.post("/search")
def search_documents(
    search_query: SearchQuery,
    profile: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    """
    Takes a user query, vectorizes it, and performs a semantic similarity 
    search against their uploaded documents.
    """
    user_id = profile.get("sub")
    
    query_vector = embedding_model.encode(search_query.query).tolist()
    
    distance_calc = DocumentVector.embedding.cosine_distance(query_vector).label("distance")
    
    results = (
        db.query(DocumentVector, Document, distance_calc)
        .join(Document, DocumentVector.document_id == Document.id)
        .filter(Document.user_id == user_id)
        .filter(Document.id == search_query.document_id)
        .order_by(distance_calc)
        .limit(search_query.top_k)
        .all()
    )

    if not results:
        return {
            "query": search_query.query,
            "answer": "No relevant documents found to answer your query.",
            "sources": []
        }
    
    formatted_results = []
    context_texts = []
    
    for vec, doc, distance in results:
        formatted_results.append({
            "document_id": doc.id,
            "filename": doc.filename,
            "content": vec.content,
            "similarity_score": round(1 - distance, 4) 
        })

        context_texts.append(vec.content.strip())

    combined_context = "\n\n---\n\n".join(context_texts)

    final_prompt = RAG_PROMPT_TEMPLATE.format(
        context=combined_context, 
        query=search_query.query
    )

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=final_prompt
        )
        ai_answer = response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Gemini API: {str(e)}")
        
    return {
        "query": search_query.query, 
        "answer": ai_answer,
        "sources": formatted_results 
    }