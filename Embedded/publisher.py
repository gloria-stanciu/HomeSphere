import startup
import time
from hardware_data import hwInfo

client = startup.start(client_id="raspi3")

client.loop_start()
for data in hwInfo:
    client.publish(f"home/hw/{data}", hwInfo.get(data))

client.loop_stop()
client.disconnect()