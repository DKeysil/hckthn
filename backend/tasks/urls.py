from .views import TeamViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')

urlpatterns = router.urls