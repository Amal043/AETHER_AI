import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AETHER Commerce Intelligence"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # CORS Configuration
    ALLOWED_ORIGINS: list[str] = [
        "*",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
    ]

    # Database Configuration
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "intellicommerce"

    @property
    def APP_NAME(self) -> str:
        return self.PROJECT_NAME

    @property
    def APP_VERSION(self) -> str:
        return self.VERSION

    @property
    def ENV(self) -> str:
        return self.ENVIRONMENT

    @property
    def CORS_ORIGINS(self) -> list[str]:
        return self.ALLOWED_ORIGINS

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Pipeline Settings
    MAX_UPLOAD_SIZE_MB: int = 50
    CHUNK_SIZE: int = 10000

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
