from django.urls import path
from .views import current_user, UserView


urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserView.as_view()),
]
