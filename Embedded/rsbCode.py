import psutil, os, time, datetime, json, smbus2, bme280


def frequency():
    print("Processors: ")
    cpu_usage = psutil.cpu_percent()
    print(cpu_usage)
    time.sleep(1)


def getRAMinfo():

    p = os.popen('free')
    i = 0
    while 1:
        i = i + 1
        line = p.readline()
        if i==2:
            return(line.split()[1:4])

def ram():

    print("\nRAM Memory: ")
    # Output is in kb, here I convert it in Mb for readability
    RAM_stats = getRAMinfo()
    RAM_total = round(int(RAM_stats[0]) / 1000,1)
    RAM_used = round(int(RAM_stats[1]) / 1000,1)
    RAM_free = round(int(RAM_stats[2]) / 1000,1)
    print("\tTotal RAM: ", RAM_total)
    print("\tUsed RAM: ", RAM_used)
    print("\tFree RAM: ", RAM_free)

def timestamp():

    print("\nTimestamp ISO format: ")
    print("\t", datetime.datetime.now().replace(microsecond=0).isoformat())

def diskUsage():
    
    print("\nDisk usage")
    disk = psutil.disk_usage('/')
    diskTotal = disk.total / 2**30     # GiB.
    diskUsed = disk.used / 2**30
    diskFree = disk.free / 2**30
    print("\tDisk total [GiB]:", diskTotal)
    print("\tDisk used [GiB]:", diskUsed)
    print("\tDisk free [GiB]:", diskFree)

def envSensor():
    port = 1
    address = 0x76
    bus = smbus2.SMBus(port)
    calibration_params = bme280.load_calibration_params(bus, address)
    data = bme280.sample(bus, address, calibration_params)
    print("\tTemperature: ", data.temperature)
    print("\tPressure: ", data.pressure)
    print("\tHumidity: ", data.humidity)
    

# while True :
#     frequency()
#     ram()
#     timestamp()
#     diskUsage()
#     envSensor()


RAM_stats = getRAMinfo()
disk = psutil.disk_usage('/')
port = 1
address = 0x76
bus = smbus2.SMBus(port)
calibration_params = bme280.load_calibration_params(bus, address)
data = bme280.sample(bus, address, calibration_params)

hwInfo = {
    "cpuUsage": psutil.cpu_percent(),
    "totalRAM": round(int(RAM_stats[0]) / 1000,1),
    "usedRAM": round(int(RAM_stats[1]) / 1000,1),
    "freeRAM": round(int(RAM_stats[2]) / 1000,1),
    "timeStamp": datetime.datetime.now().replace(microsecond=0).isoformat(),
    "diskTotal": disk.total / 2**30,
    "diskUsed": disk.used / 2**30,
    "diskFree": disk.free / 2**30, 
    "temperature": data.temperature,
    "pressure": data.pressure,
    "humidity": data.humidity
}

info = json.dumps(hwInfo, indent=4)
print(info)