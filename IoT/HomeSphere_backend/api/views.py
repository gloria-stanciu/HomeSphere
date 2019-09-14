from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from .serializers import SensorDataSerializer
from .models import SensorData

class SensorDataViewSet(APIView):
    def get(self, request, pk=None):
        queryset = SensorData.objects.all().order_by('deviceID')
        serializer_class = SensorDataSerializer(queryset, many=True)
        return Response(queryset)
