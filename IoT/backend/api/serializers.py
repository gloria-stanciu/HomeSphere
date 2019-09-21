from rest_framework.serializers import ModelSerializer
from .models import Device, Sensor, SensorData
from rest_framework import serializers

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('url', 'deviceId', 'name', 'location', 'sensors')

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ('url', 'sensorId', 'name', 'sensorData')

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ('url', 'data', 'date')
