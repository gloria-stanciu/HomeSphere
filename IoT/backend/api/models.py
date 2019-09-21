# from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from djongo import models
from django import forms

# Create your models here.

class SensorData(models.Model):
    data = models.CharField(max_length=30, default = None)
    date = models.DateTimeField(null=True, blank = True, default = None)
    class Meta:
        abstract =True
    def __str__(self):
        return F"{self.data} {self.date}"


class Sensor(models.Model):
    name = models.CharField(max_length=60, default = None)
    sensorId = models.CharField(max_length=30, default = None, unique = True)
    sensorData = models.ForeignObject(to = SensorData, on_delete=models.CASCADE, default = None)
    def __str__(self):
        return F"{self.name} {self.sensorId} {self.sensorData}"
    pass


class Device(models.Model):
    deviceId = models.CharField(max_length=30, default = None, unique = True)
    name = models.CharField(max_length=60, default = None)
    location = models.CharField(max_length = 60, default = None)
    sensors = models.ForeignObject(to = Sensor, on_delete=models.CASCADE, default = None)
    def __str__(self):
        return F"{self.deviceId} {self.name} {self.location} {self.sensors}"
