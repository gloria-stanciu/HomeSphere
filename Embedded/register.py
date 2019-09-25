import startup
import time
from hardware_data import hwInfo
import json

client = startup.start(client_id="raspi3")

client.loop_start()


jsonData = json.dumps(hwInfo)
client.publish(f"register", jsonData)

client.loop_stop()
client.disconnect()
