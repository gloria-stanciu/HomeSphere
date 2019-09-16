from rest_framework import serializers
from .models import Device, Sensor

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['deviceId', 'name', 'location', 'sensors']

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['sensorId', 'name', 'data', 'date']