from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient
from core.config import settings


jwk_client = PyJWKClient(settings.JWKS_URL)
security = HTTPBearer()

def verify_clerk_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        signing_key = jwk_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=settings.CLERK_ISSUER,
            options={"verify_signature": True, "verify_exp": True},
            leeway=10
        )
        return payload
    except Exception as e:
        print(f"JWT Verification Failed: {type(e).__name__} - {str(e)}") 
        raise HTTPException(status_code=403, detail="Forbidden request")