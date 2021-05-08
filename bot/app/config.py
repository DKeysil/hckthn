import os
import secrets

from pydantic import BaseSettings


class Settings(BaseSettings):

    MONGO_USER: str = os.environ.get("MONGO_USER", "hktn_bot")
    MONGO_PASSWORD: str = os.environ.get("MONGO_PASSWORD", "hktn_bot")
    MONGO_HOST: str = os.environ.get("MONGO_HOST", "0.0.0.0")
    MONGO_PORT: str = os.environ.get("MONGO_PORT", "27017")
    MONGO_DB: str = os.environ.get("MONGO_DB", "hktn_bot")

    REDIS_HOST: str = os.environ.get("REDIS_HOST", "localhost")

    TG_TOKEN: str = "1792894099:AAFtijieOzkn2WV_HyMBxYBGJpSybjVj0d8"

    CELERY_BROKER_URL: str = "amqp://guest@localhost//"

    class Config:
        case_sensitive = True


settings = Settings()
