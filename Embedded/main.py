import json
import os

from paho.mqtt import subscribe

from lib.Device import Device
from lib.Hardware import get_disk_total, get_ram_total
from utils.configs import getOrGenId, loadConfig, updateConfig

config = loadConfig('./config.local.json', './config.json')

print(config)
if config is False:
    print('Config file not found.')
    exit()

if config['device']['disk_total'] == None and config['device']['ram_total'] == None:
    config['device']['disk_total'] = str(get_disk_total())
    config['device']['ram_total'] = str(get_ram_total())
    updateConfig('./config.local.json', './config.json', config)

id = getOrGenId(config)

device = Device(
    id,
    config['device']['name'],
    config['device']['location'],
    config['device']['disk_total'],
    config['device']['ram_total']
)

device.loadMqtt(
    config['mqtt']['broker'],
    config['mqtt']['client'],
    username=config['mqtt']['usrnam'],
    password=config['mqtt']['passwd'],
)

device.loadSensors(config['sensors'])
device.start()


# TODO: MQTT handle registration success messages
