import paho.mqtt.client as mqtt
import time
import socket
from src.config import config


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected!")
    else:
        print("Not connected. Returned code: ", rc)


def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnected result code "+str(rc))


def on_message(client, userdata, message):
    print("\nMessage topic: ", message.topic)
    print("Message received: ", str(message.payload.decode("utf-8")))


def on_publish(mqttc, obj, mid):
    print("mid: " + str(mid))
    pass


def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))


def start(client_id):
    client = mqtt.Client(client_id, config.__protcl__)
    client.username_pw_set(config.__usrnam__, config.__passwd__)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    client.on_publish = on_publish
    client.on_subscribe = on_subscribe

    client.connect(config.__broker__)

    print("Connecting to broker...", config.__broker__)
    return client
