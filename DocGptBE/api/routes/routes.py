from fastapi import APIRouter, Depends
from api.dependencies import verify_clerk_token
import os
import tempfile
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from docling.document_converter import DocumentConverter

router = APIRouter(dependencies=[Depends(verify_clerk_token)])

@router.get("/secure-hello")
def secure_say_hello():
    return {"message": "Hello! You are authenticated."}

@router.get("/my-profile")
def get_profile(user_data: dict = Depends(verify_clerk_token)):
    return {"message": "Profile data", "data": user_data}

@router.post("/upload")
def upload_document(file: UploadFile = File(...)):
    """
    Accepts a file from the frontend, parses it using Docling, 
    and returns the structured output for inspection.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    temp_file_path = ""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=f"_{file.filename}") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name

        converter = DocumentConverter()
        result = converter.convert(temp_file_path)
        
        parsed_dict = result.document.export_to_dict()
        markdown_text = result.document.export_to_markdown()

        return {
            "status": "success",
            "filename": file.filename,
            "markdown_preview": markdown_text[:500] + "...",
            "full_markdown": markdown_text,
            "structured_data": parsed_dict
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing document: {str(e)}")
        
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
        file.file.close()