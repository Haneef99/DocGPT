from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    CLERK_ISSUER: str
    
    @property
    def JWKS_URL(self) -> str:
        return f"{self.CLERK_ISSUER}/.well-known/jwks.json"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()