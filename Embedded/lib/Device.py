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
        print('starting')
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
        print('2')
        sensorList['deviceId'] = self.id
        sensorList = self.sensors
        nofCurrent = 0
        currentMethod = None
        currentUnit = None
        for sensor in sensorList:
            if 'current' in sensor['name']:
                sensor['name'] = 'current-cost-0'
                nofCurrent = sensor['nof']
                currentMethod = sensor['method']
                currentUnit = sensor['unit']
                del sensor['nof']
        print('3')
        i = 1
        while i < int(nofCurrent):
            sensorList.append({
                'name': f'current-cost-{i}',
                'method': currentMethod,
                'unit': currentUnit
            })
            i += 1

        print('4')

        for sensor in sensorList:
            del sensor['method']

        self.mqtt.publish('devices/register', json.dumps(device))
        self.mqtt.publish('sensors/register', json.dumps(sensorList))
        print('5')

        while True:
            sensorsData['deviceId'] = self.id

            for sensor in sensorsCopy:
                method = sensor['method']
                if 'current' in sensor['name']:
                    current_data = read_data.get(
                        method, lambda: 'Invalid method')
                    i = 0
                    readData = current_data(sensor['nof'])
                    print('printing data')
                    for data in readData:
                        print(data)
                        sensorsData[f'{sensor["name"]}-{i}'] = data
                        i += 1
                else:
                    sensorsData[sensor['name']] = read_data.get(
                        method, lambda: 'Invalid method')()

            time.sleep(2)
            sensorsData['date'] = datetime.now().isoformat()
            print(sensorsData)
            self.mqtt.publish('sensors/readings', json.dumps(sensorsData))

        self.mqtt.loop_stop()
        self.mqtt.disconnect()
