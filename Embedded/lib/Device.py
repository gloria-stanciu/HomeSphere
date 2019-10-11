import json
import time
from datetime import datetime
from pickle import dumps
import copy

import paho.mqtt.client as MQTT
from paho.mqtt import subscribe

from lib.Hardware import read_data
from services.handlers import topics
from services.mqtt import (on_connect, on_disconnect, on_message, on_publish,
                           on_subscribe)


class Device:
    def __init__(self, _id, name, location, disk, ram):
        self.id = _id
        self.name = name
        self.location = location
        self.disk_total = disk
        self.ram_total = ram
        self.sensors = []
        self.mqtt = None

    def loadSensors(self, sensorList):
        for sensor in sensorList:
            self.sensors.append(sensor)
        return len(self.sensors)

    def getAllSensors(self):
        return self.sensors

    sensor_readings = {}

    def getSensor(self, name):
        for sensor in self.sensors:
            if sensor['name'] == name:
                return sensor
        return False

    def loadMqtt(self, broker, client, username, password):
        self.mqtt = MQTT.Client(client, 3)
        if username and password:
            self.mqtt.username_pw_set(username, password)

        self.mqtt.on_connect = on_connect
        self.mqtt.on_disconnect = on_disconnect
        self.mqtt.on_message = on_message
        self.mqtt.on_publish = on_publish
        self.mqtt.on_subscribe = on_subscribe
        self.mqtt.connect(broker)
        return self.mqtt

    def start(self):
        sensorsCopy = copy.deepcopy(self.sensors)
        sensorList = {}
        sensorsData = {}
        self.mqtt.loop_start()
        for topic in topics.keys():
            self.mqtt.subscribe(topic)

        device = {
            "_id": self.id,
            "name": self.name,
            "location": self.location,
            "disk_total": self.disk_total,
            "ram_total": self.ram_total
        }
        sensorList['deviceId'] = self.id
        sensorList['sensors'] = self.sensors

        for sensor in sensorList['sensors']:
            del sensor['method']

        self.mqtt.publish('devices/register', json.dumps(device))
        self.mqtt.publish('sensors/register', json.dumps(sensorList))

        while True:
            sensorsData['deviceId'] = self.id

            for sensor in sensorsCopy:
                method = sensor['method']
                sensorsData[sensor['name']] = read_data.get(
                    method, lambda: 'Invalid method')()

            time.sleep(2)
            sensorsData['date'] = datetime.now().isoformat()
            self.mqtt.publish('sensors/readings', json.dumps(sensorsData))

        self.mqtt.loop_stop()
        self.mqtt.disconnect()
