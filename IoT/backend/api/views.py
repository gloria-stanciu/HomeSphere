from django.shortcuts import render
from django import forms
from rest_framework import viewsets

# Create your views here.
from .models import Device, Sensor, SensorData
from .serializers import DeviceSerializer, SensorSerializer, SensorDataSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all().order_by('name')
    serializer_class = DeviceSerializer

class SensorViewSet(viewsets.FormViewSet):
    queryset = Sensor.objects.all().order_by('name')
    serializer_class = SensorSerializer

class SensorDataViewSet(viewsets.FormViewSet):
    queryset = SensorData.objects.all().order_by('date')
    serializer_class = SensorDataSerializer
    