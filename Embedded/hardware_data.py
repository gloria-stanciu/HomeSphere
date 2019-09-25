import psutil
import os
from datetime import datetime
import json
import smbus2
import bme280

port = 1
address = 0x76


def getRAMinfo():
    p = os.popen('free')
    i = 0
    while 1:
        i = i + 1
        line = p.readline()
        if i == 2:
            return(line.split()[1:4])


RAM_stats = getRAMinfo()
disk = psutil.disk_usage('/')
# bus                 = smbus2.SMBus(port)
# calibration_params  = bme280.load_calibration_params(bus, address)
# data                = bme280.sample(bus, address, calibration_params)

hwInfo = {
    "_id": "raspi3-001",
    "deviceName": "raspberrypi3",
    "location": "dorm-316/2"
    # "ram_total":    round(int(RAM_stats[0]) / 1000, 1),
    # "disk_total":   disk.total / 2**30,
}

hwUsage = {
    "_id": hwInfo['_id'],
    "cpu_usage":    psutil.cpu_percent(),
    "ram_used":     round(int(RAM_stats[1]) / 1000, 1),
    "ram_free":     round(int(RAM_stats[2]) / 1000, 1),
    "disk_used":    disk.used / 2**30,
    "disk_free":    disk.free / 2**30,
    "timestamp":    str(datetime.now().isoformat())
    # "temperature":  data.temperature,
    # "pressure":     data.pressure,
    # "humidity":     data.humidity
}

# info = json.dumps(hwInfo, indent=4)
# print(info)
