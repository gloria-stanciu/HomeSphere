from rest_framework import viewsets
from .serializers import SensorDataSerializer
from .models import SensorData

class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all().order_by('deviceID')
    serializer_class = SensorDataSerializer