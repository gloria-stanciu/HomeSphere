from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Device, Sensor
from .serializers import DeviceSerializer, SensorSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by('name')
    serializer_class = DeviceSerializer

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all().order_by('name')
    serializer_class = SensorSerializer