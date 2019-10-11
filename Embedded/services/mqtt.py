import paho.mqtt.client as mqtt
import time
from services.handlers import topics
import json


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected!")
    else:
        print("Not connected. Returned code: ", rc)


def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnected result code "+str(rc))


def on_message(client, userdata, message):
    handler = topics.get(message.topic, lambda: 'Invalid function')
    handler(message.payload.decode('utf-8'))


def on_publish(mqttc, obj, mid):
    print("mid: " + str(mid))
    pass


def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))
