import psutil, os, time, datetime, json, smbus2, bme280


def getRAMinfo():
    p = os.popen('free')
    i = 0
    while 1:
        i = i + 1
        line = p.readline()
        if i==2:
            return(line.split()[1:4])


port = 1
address = 0x76

RAM_stats           = getRAMinfo()
disk                = psutil.disk_usage('/')
bus                 = smbus2.SMBus(port)
calibration_params  = bme280.load_calibration_params(bus, address)
data                = bme280.sample(bus, address, calibration_params)

hwInfo = {
    "cpuUsage":     psutil.cpu_percent(),
    "totalRAM":     round(int(RAM_stats[0]) / 1000,1),
    "usedRAM":      round(int(RAM_stats[1]) / 1000,1),
    "freeRAM":      round(int(RAM_stats[2]) / 1000,1),
    "diskTotal":    disk.total / 2**30,
    "diskUsed":     disk.used / 2**30,
    "diskFree":     disk.free / 2**30,
    "temperature":  data.temperature,
    "pressure":     data.pressure,
    "humidity":     data.humidity,
    "timeStamp":    datetime.datetime.now().replace(microsecond=0).isoformat()
}

info = json.dumps(hwInfo, indent=4)
print(info)