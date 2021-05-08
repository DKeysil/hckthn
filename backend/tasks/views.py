from .serializers import (
    TeamSerializer, PlanSerializer,
    TaskSerializer, NotificationSerializer,
    HistorySerializer)
from rest_framework import viewsets
from .models import (
    Team, Plan, Task,
    Notification, History
)
from rest_framework.permissions import IsAuthenticated
import django_filters.rest_framework

# Create your views here.


class TeamViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing team instances.
    """
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    permission_classes = (IsAuthenticated,)


class PlanViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing plan instances.
    """
    serializer_class = PlanSerializer
    queryset = Plan.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['team']


class TaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing task instances.
    """
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = (IsAuthenticated,)
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['plan']


class NotificationViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing notification instances.
    """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    permission_classes = (IsAuthenticated,)


class HistoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing history instances.
    """
    serializer_class = HistorySerializer
    queryset = History.objects.all()
    permission_classes = (IsAuthenticated,)
