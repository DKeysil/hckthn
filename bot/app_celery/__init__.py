import logging
from celery import Celery
from celery.schedules import crontab
import pymongo
from app.config import settings
import datetime

celery_app = Celery("worker", broker=settings.CELERY_BROKER_URL)


@celery_app.task()
def test_task():
    logging.info('TEST')


celery_app.conf.beat_schedule = {
    "test_task": {
        "task": "app.celery_app.test_task",
        "schedule": crontab(minute="*/2"),
    },
}