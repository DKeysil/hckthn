from .views import (
    TeamViewSet, PlanViewSet,
    TaskViewSet, NotificationViewSet,
    HistoryViewSet)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'plans', PlanViewSet, basename='plan')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'histories', HistoryViewSet, basename='history')

urlpatterns = router.urls