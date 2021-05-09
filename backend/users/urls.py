from django.urls import path
from .views import UserViewSet, UserView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('create_user/', UserView.as_view()),
] + router.urls
