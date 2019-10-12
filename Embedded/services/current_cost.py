import io
import serial
import untangle
from serial import Serial

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


print(getNofSensors())
