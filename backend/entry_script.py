from users.models import User
from tasks.models import Team, Task, Plan
from datetime import datetime

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()

# Create teams


def create_objects():
    team_1 = Team.objects.create(title="Team number 1")
    team_2 = Team.objects.create(title="Another team")


    # Create Plans

    plan_1 = Plan.objects.create(
        title="My first plan",
        team=team_1,
        start_date=datetime(year=2021, month=5, day=3, hour=10, minute=15),
        end_date=datetime(year=2021, month=5, day=25, hour=10, minute=15),
    )

    plan_2 = Plan.objects.create(
        title="Amazing plan",
        team=team_2,
        start_date=datetime(year=2021, month=5, day=1, hour=13, minute=23),
        end_date=datetime(year=2021, month=5, day=15, hour=17, minute=15),
    )


    # Create Users

    user_1 = User.objects.create_user(
        username="dkeysil",
        email="test@email.com",
        password="123456789",
        role=0,
        team=team_1
    )

    user_2 = User.objects.create_user(
        username="vitalik",
        email="test2@email.com",
        password="123456789",
        role=1,
        team=team_1
    )

    user_3 = User.objects.create_user(
        username="timofey",
        email="test3@email.com",
        password="123456789",
        role=0,
        team=team_2
    )

    user_4 = User.objects.create_user(
        username="Suprun",
        email="test4@email.com",
        password="123456789",
        role=1,
        team=team_2
    )

    # Create Tasks

    task_1 = Task.objects.create(
        title="Create react app",
        description="This task have description",
        start_date=datetime(year=2021, month=5, day=3, hour=10, minute=15),
        end_date=datetime(year=2021, month=5, day=6, hour=17, minute=15),
        type=0,
        plan=plan_1,
        state=2
    )

    task_1.responsibles.set([user_1, user_2])

    task_2 = Task.objects.create(
        title="Create django app",
        start_date=datetime(year=2021, month=5, day=6, hour=17, minute=15),
        end_date=datetime(year=2021, month=5, day=13, hour=10, minute=11),
        type=0,
        plan=plan_1,
        state=1
    )

    task_2.responsibles.set([user_1, user_2])


    task_3 = Task.objects.create(
        title="Create another app",
        description="I will",
        start_date=datetime(year=2021, month=5, day=1, hour=12, minute=23),
        end_date=datetime(year=2021, month=5, day=6, hour=17, minute=15),
        type=1,
        plan=plan_2,
        state=2
    )

    task_3.responsibles.set([user_3, user_4])


    task_4 = Task.objects.create(
        title="Leave",
        start_date=datetime(year=2021, month=5, day=6, hour=17, minute=15),
        end_date=datetime(year=2021, month=5, day=15, hour=17, minute=15),
        type=1,
        plan=plan_2,
        state=1
    )

    task_4.responsibles.set([user_3, user_4])
