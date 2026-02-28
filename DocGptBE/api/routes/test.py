from fastapi import APIRouter, Depends
from api.dependencies import verify_clerk_token

router = APIRouter(dependencies=[Depends(verify_clerk_token)])

@router.get("/secure-hello")
def secure_say_hello():
    return {"message": "Hello! You are authenticated."}

@router.get("/my-profile")
def get_profile(user_data: dict = Depends(verify_clerk_token)):
    return {"message": "Profile data", "data": user_data}