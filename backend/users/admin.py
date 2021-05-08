from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('role', 'team',)}),
    )


admin.site.register(User, CustomUserAdmin)
