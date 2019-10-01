from src.config.startup import start
from src.services.id import get_device_id
from src.services.sensors import get_hardware_usage, get_sensor_readings
from datetime import datetime
import json
import time


def publish_hardware():
    client = start(get_device_id())

    client.loop_start()

    while True:
        hardware_data = []

        for hardware in get_hardware_usage():
            tmp = {
                "sensorName": hardware["name"],
                "data": hardware["usage"],
                "date": datetime.now().isoformat()
            }
            hardware_data.append(tmp)

        for sensor in get_sensor_readings():
            tmp = {
                "sensorName": sensor["name"],
                "data": sensor["usage"],
                "date": datetime.now().isoformat()
            }
            hardware_data.append(tmp)

        client.publish(
            f"home/hw/data/{get_device_id()}", json.dumps(hardware_data))
        time.sleep(6)

    client.loop_stop()
    client.disconnect()
