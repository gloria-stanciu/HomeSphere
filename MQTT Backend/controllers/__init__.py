import paho.mqtt.client as mqtt
import time
import socket
import json

import paho.mqtt.client as mqtt

__broker__ = "167.71.42.195"
__protcl__ = mqtt.MQTTv31
__usrnam__ = "gloria"
__passwd__ = "stanciu160499"

from controllers.on_connect import on_connect
from controllers.on_disconnect import on_disconnect
from controllers.on_message import on_message
from controllers.on_publish import on_publish
from controllers.on_subscribe import on_subscribe


def start(client_id):
    client = mqtt.Client(client_id, __protcl__)
    client.username_pw_set(__usrnam__, __passwd__)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    client.on_publish = on_publish
    client.on_subscribe = on_subscribe

    client.connect(__broker__)

    print("Connecting to broker...", __broker__)
    print(client)
    return client
