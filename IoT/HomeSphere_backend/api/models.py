from django.db import models

# Create your models here.
class SensorData(models.Model):
    cpuUsage = models.CharField(max_length = 3)
    totalRAM = models.CharField(max_length = 10)
    usedRAM = models.CharField(max_length = 10)
    freeRAM = models.CharField(max_length = 10)
    timeStamp = models.CharField(max_length = 10)
    diskTotal = models.CharField(max_length = 10)
    diskUsed = models.CharField(max_length = 10)
    diskFree = models.CharField(max_length = 10)
    temperature = models.CharField(max_length = 10)
    pressure = models.CharField(max_length = 10)
    humidity = models.CharField(max_length = 10)
    deviceID = models.CharField(max_length = 20)

    def __str__(self):
        return self.deviceID
