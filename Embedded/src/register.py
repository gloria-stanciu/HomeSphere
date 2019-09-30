from src.config.startup import start
from src.services.id import get_device_id
import time
import json


sensors = [
    "cpu",
    "ram_used",
    "ram_free",
    "disk_used",
    "disk_free"
]

device = {
    "_id": get_device_id(),
    "deviceName": "test_rpi",
    "location": "dorm"
}

client = start(get_device_id())

client.loop_start()

device_json = json.dumps(device)
sensors_json = json.dumps(sensors)

client.publish(f"register/device", device_json)
client.publish(f"register/sensors/{get_device_id()}", sensors_json)

client.loop_stop()
client.disconnect()