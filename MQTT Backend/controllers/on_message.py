import os
import requests
import json
import re

pattern = re.compile("^register/sensors/*.")


def on_message(client, userdata, message):
    print("\nMessage topic: ", message.topic)
    if message.topic == "register/device":
        registerDevice(json.loads(
            str(message.payload.decode("utf-8", "ignore"))))
    elif pattern.match(message.topic):
        id = message.topic.split("/")[2]
        registerSensors(json.loads(
            str(message.payload.decode("utf-8", "ignore"))), id)
    else:
        msg = str(message.payload.decode("utf-8", "ignore"))
        registerReadings(msg, message.topic.split("/")[3])

    f = open("logs", "a+")
    f.write(F'{message.topic}\t {msg}\n')
    f.close()


def registerDevice(device):
    print(F"Registering a device {device['_id']}")
    print(device)
    post = requests.post("http://glos.digital:3000/devices", data=device)
    print(post.text)


def registerSensors(sensors, id):
    print(id)
    print(sensors)
    for sensor in sensors:
        dict = {
            "sensorName": sensor
        }
        print(F"Registering a sensor: {sensor}")
        post = requests.post(
            F"http://glos.digital:3000/sensors/{id}", dict)
        print(post.text)


def registerReadings(readings, id):
    print(F"Registering readings:")
    print(json.loads(readings))
    print(id)
    post = requests.post(
        F"http://glos.digital:3000/devices/{id}/sensors", json=json.loads(readings))
    print(post)


def sensorStats(dict):
    print(F"Sending sensor stats")
