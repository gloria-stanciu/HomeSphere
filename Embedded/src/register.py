from src.config.startup import start
from src.services.id import get_device_id
import time
import json

registerSensors = {
    "deviceId": get_device_id(),
    "sensors": [
        {
            "name": "cpu",
            "unit": "%"
        },
        {
            "name": "ram_used",
            "unit": "MB"
        },
        {
            "name": "ram_free",
            "unit": "MB"
        },
        {
            "name": "disk_used",
            "unit": "MB"
        },
        {
            "name": "disk_free",
            "unit": "MB"
        },
        {
            "name": "temperature",
            "unit": "C"
        },
        {
            "name": "pressure",
            "unit": "hPa"
        }
    ]
}

device = {
    "_id": get_device_id(),
    "name": "raspberry_pi",
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
