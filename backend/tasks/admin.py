from django.contrib import admin
from .models import Team, Plan, Task, Notification, History

# Register your models here.

admin.site.register(Team)
admin.site.register(Plan)
admin.site.register(Task)
admin.site.register(Notification)
admin.site.register(History)
