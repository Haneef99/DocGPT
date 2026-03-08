from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    CLERK_ISSUER: str
    DATABASE_URL: str
    GEMINI_API_KEY: str
    
    @property
    def JWKS_URL(self) -> str:
        return f"{self.CLERK_ISSUER}/.well-known/jwks.json"

    @property
    def database_url(self) -> str:
        return self.DATABASE_URL

    @property
    def gemini_api_key(self) -> str:
        return self.GEMINI_API_KEY

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()