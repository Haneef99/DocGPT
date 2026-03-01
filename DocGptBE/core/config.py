from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    CLERK_ISSUER: str
    DATABASE_URL: str
    
    @property
    def JWKS_URL(self) -> str:
        return f"{self.CLERK_ISSUER}/.well-known/jwks.json"

    @property
    def database_url(self) -> str:
        return self.DATABASE_URL

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()