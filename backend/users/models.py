from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Role(models.IntegerChoices):
        STUDENT = 1
        MENTOR = 2

    role = models.IntegerField(choices=Role.choices, default=Role.STUDENT)
    team = models.ForeignKey("tasks.Team", on_delete=models.CASCADE, related_name="users", default=1)
