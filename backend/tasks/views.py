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
from rest_framework.response import Response

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

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.order_by('start_date')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        print(request.user)
        print(data)

        old_task = self.get_object()
        if old_task.column_order != data.get('column_order'):
            pass

        if old_task.state != data.get('state'):
            History.objects.create(
                task=old_task,
                type=4,
                user=user,
            )

        if old_task.description != data.get('description'):
            History.objects.create(
                task=old_task,
                type=3,
                user=user,
            )
        # TODO: сделать историю с типом FINISH и INITIALIZER
        print(args, kwargs)
        return super(TaskViewSet, self).update(request, *args, **kwargs)


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
