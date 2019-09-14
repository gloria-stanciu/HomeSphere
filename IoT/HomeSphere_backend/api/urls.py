from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# router = routers.DefaultRouter()
# router.register(r'sensordatas', views.SensorDataViewSet.as_view())

urlpatterns = [
    # path('', include(router.urls)),
    path('sensordata/', views.SensorDataViewSet.as_view()),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = format_suffix_patterns(urlpatterns)