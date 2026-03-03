from fastapi import APIRouter, Depends
from api.dependencies import verify_clerk_token
import os
import tempfile
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from docling.document_converter import DocumentConverter
from core.database import get_db
from sqlalchemy.orm import Session
from models.document import Document

router = APIRouter(dependencies=[Depends(verify_clerk_token)])

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

        converter = DocumentConverter()
        result = converter.convert(temp_file_path)
        
        parsed_dict = result.document.export_to_dict()
        markdown_text = result.document.export_to_markdown()

        documents = db.query(Document).filter(Document.user_id == user_id).all()
        return {"documents": [{"id": doc.id, "filename": doc.filename} for doc in documents]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing document: {str(e)}")
        
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
        file.file.close()