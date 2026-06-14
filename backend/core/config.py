from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Mum Companion API"
    groq_api_key: str
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str
    hf_api_token: str = ""
    jwt_secret: str = "change-in-production"
    environment: str = "development"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
