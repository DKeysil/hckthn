from .serializers import TeamSerializer
from rest_framework import viewsets
from .models import Team
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class TeamViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing team instances.
    """
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    permission_classes = (IsAuthenticated,)
