from src.config.startup import start
from src.services.id import get_device_id
import time
import json

registerSensors = {
    "deviceId": get_device_id(),
    "sensors": [
        "cpu",
        "ram_used",
        "ram_free",
        "disk_used",
        "disk_free",
        "temperature",
        "humidity",
        "pressure"
    ]
}

device = {
    "id": get_device_id(),
    "deviceName": "raspberry_pi",
    "location": "dorm@316/2"
}

client = start(get_device_id())

client.loop_start()

device_json = json.dumps(device)
sensors_json = json.dumps(registerSensors)

client.publish(f"devices/register", device_json)
client.publish(f"sensors/register", sensors_json)

client.loop_stop()
client.disconnect()
