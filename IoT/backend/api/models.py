from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from djongo import models
from django.utils import timezone



# Create your models here.
class Sensor(models.Model):
    name = models.CharField(max_length=60, default = None)
    sensorId = models.CharField(max_length=30, default = None, unique = True)
    data = models.CharField(max_length=30, default = None)
    date = models.DateTimeField(null=True, blank = True)
    
    def __str__(self):
        return F"{self.sensorId} {self.name} {self.data} {self.date}"
    pass

class Device(models.Model):
    deviceId = models.CharField(max_length=30, default = None, unique = True)
    name = models.CharField(max_length=60, default = None)
    location = models.CharField(max_length = 60, default = None)
    sensors = models.ForeignKey(to = Sensor, on_delete=models.CASCADE)
    def __str__(self):
        return F"{self.deviceId} {self.name} {self.location} {self.sensors}"

