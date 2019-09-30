import startup
import time
from hardware_data import hwUsage, hwInfo
import json

client = startup.start(client_id="raspi3")

client.loop_start()
jsonData = json.dumps(hwUsage)
client.publish(f"home/hw/data/{hwInfo['_id']}", jsonData)

client.loop_stop()
client.disconnect()
