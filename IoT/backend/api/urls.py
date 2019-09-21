from django.conf.urls import url, include
from rest_framework import routers
from .views import DeviceViewSet, SensorViewSet, SensorDataViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register(r'device', DeviceViewSet)
router.register(r'sensor', SensorViewSet, base_name='sensor')
router.register(r'sensorData', SensorDataViewSet, base_name='sensorData')


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    
]