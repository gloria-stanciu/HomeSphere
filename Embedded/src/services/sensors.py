import psutil
import os
import json
import smbus2
import bme280


def get_ram_info():
    p = os.popen('free')
    i = 0
    while 1:
        i = i + 1
        line = p.readline()
        if i == 2:
            return(line.split()[1:4])


def get_cpu_usage():
    return psutil.cpu_percent()


def get_ram_total():
    return round(int(get_ram_info()[0]) / 1000, 1)


def get_ram_used():
    return round(int(get_ram_info()[1]) / 1000, 1)


def get_ram_free():
    return round(int(get_ram_info()[2]) / 1000, 1)


def get_disk_total():
    return psutil.disk_usage("/").total / 2**30


def get_disk_used():
    return psutil.disk_usage("/").used / 2**30


def get_disk_free():
    return psutil.disk_usage("/").free / 2**30


def get_hardware_usage():
    return [
        {
            "name": "_cpu",
            "usage": get_cpu_usage()
        },
        {
            "name": "_ram_used",
            "usage": get_ram_used()
        },
        {
            "name": "_ram_free",
            "usage": get_ram_free()
        },
        {
            "name": "_disk_used",
            "usage": get_disk_used()
        },
        {
            "name": "_disk_free",
            "usage": get_disk_free()
        }
    ]


##########################

def sensors():
    port = 1
    address = 0x76
    bus = smbus2.SMBus(port)
    calibration_params = bme280.load_calibration_params(bus, address)
    data = bme280.sample(bus, address, calibration_params)
    return data


def get_temp():
    return sensors().temperature


def get_pressure():
    return sensors().pressure


def get_humidity():
    return sensors().humidity


def get_sensor_readings():
    return [
        {
            "name": "temperature",
            "usage": get_temp()
        },
        {
            "name": "presure",
            "usage": get_pressure()
        },
        {
            "name": "humidity",
            "usage": get_humidity()
        }
    ]
