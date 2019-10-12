import io
import serial
import untangle
from serial import Serial
from utils.configs import updateConfig

serial = Serial("/dev/ttyUSB0", 57600, timeout=6)


def readXML():
    try:
        line = serial.readline()
        print(line, '\n-----\n')
        decoded = line.decode('utf-8').strip()
        return untangle.parse(decoded)
    except:
        return False


def isXMLgood(xml):
    try:
        if isinstance(int(xml.msg.sensor.cdata), int):
            return True
        else:
            return False
    except:
        return False


def findSensors():
    sensorOcc = [0] * 10
    isReading = True

    while isReading:
        xml = readXML()
        if xml and isXMLgood(xml):
            sensorNr = int(xml.msg.sensor.cdata)
            sensorOcc[sensorNr] += 1
            if sensorOcc[sensorNr] > 1:
                return sensorOcc


def getNofSensors():
    nofSensors = 0
    for el in findSensors():
        if el > 0:
            nofSensors += 1

    return nofSensors


def updateSensors(config):
    print('configuring current cost sensors')
    for sensor in config['sensors']:
        if 'current' in sensor:
            sensor['nof'] = getNofSensors()
    updateConfig('./config.local.json', './config.json', config)


def get_current(totalReadings):
    nofReadings = 0
    readings = []
    while True:
        xml = readXML()
        if xml and isXMLgood(xml):
            nofReadings += 1
            if nofReadings == int(totalReadings):
                readings.append(float(xml.msg.ch1.watts.cdata))
                return readings
                print(readings)
                break
            else:
                readings.append(float(xml.msg.ch1.watts.cdata))
        else:
            print(readings)
            break
            return readings
