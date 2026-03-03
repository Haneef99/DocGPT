from fastapi import APIRouter, Depends
from api.dependencies import verify_clerk_token
from pydantic import BaseModel
import os
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


router = APIRouter(dependencies=[Depends(verify_clerk_token)])
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

class SearchQuery(BaseModel):
    query: str
    top_k: int = 2

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
    return {"documents": [{"id": doc.id, "filename": doc.filename} for doc in documents]}

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

        # 2. Parse Document with Docling
        converter = DocumentConverter()
        result = converter.convert(temp_file_path)

        # 3. Chunk the document 
        chunker = HierarchicalChunker()
        chunk_iter = chunker.chunk(result.document)
        
        # 4. Vectorize and save chunks
        db_vectors = []
        for chunk in chunk_iter:
            text_content = chunk.text
            
            # Skip empty chunks
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
            
        # Bulk save for better performance
        if db_vectors:
            db.bulk_save_objects(db_vectors)
            db.commit()

        documents = db.query(Document).filter(Document.user_id == user_id).all()
        return {
            "documents": [{"id": doc.id, "filename": doc.filename} for doc in documents]
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
    
    # 1. Vectorize the user's question
    query_vector = embedding_model.encode(search_query.query).tolist()
    
    # 2. Perform semantic search using pgvector's cosine distance
    # We join with the Document table to ensure the user can only search their own files
    results = (
        db.query(DocumentVector, Document)
        .join(Document, DocumentVector.document_id == Document.id)
        .filter(Document.user_id == user_id)
        .order_by(DocumentVector.embedding.cosine_distance(query_vector))
        .limit(search_query.top_k)
        .all()
    )
    
    # 3. Format the output
    formatted_results = []
    for vec, doc in results:
        formatted_results.append({
            "document_id": doc.id,
            "filename": doc.filename,
            "content": vec.content,
            # Cosine distance to similarity score conversion
            "similarity_score": round(1 - vec.embedding.cosine_distance(query_vector), 4) 
        })
        
    return {"query": search_query.query, "results": formatted_results}