from celery import shared_task
from tasks.models import Task, Notification
from django.utils import timezone


def change_status_on_issue(task: Task):
    task.type = 2
    task.save()


def create_notification(task: Task):
    Notification.objects.create(
        checked=False,
        task=task,
    )


@shared_task
def check_tasks_deadline():
    print('Check tasks for deadline started')
    tasks = Task.objects.exclude(state=3).exclude(state=4).exclude(type=2).all()

    for task in tasks:
        if timezone.now() > task.end_date:
            change_status_on_issue(task)
            create_notification(task)
