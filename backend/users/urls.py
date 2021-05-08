from django.urls import path
from .views import UserView, UserListView


urlpatterns = [
    path('create_user/', UserView.as_view()),
    path('users/', UserListView.as_view())
]
