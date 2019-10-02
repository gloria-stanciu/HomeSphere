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
        hardware_data = {
            'deviceId': get_device_id(),
            'data': []
        }

        for hardware in get_hardware_usage():
            tmp = {
                "sensorName": hardware["name"],
                "data": hardware["usage"],
                "date": datetime.now().isoformat()
            }
            hardware_data['data'].append(tmp)

        # for sensor in get_sensor_readings():
        #     tmp = {
        #         "sensorName": sensor["name"],
        #         "data": sensor["usage"],
        #         "date": datetime.now().isoformat()
        #     }
        #     hardware_data.append(tmp)

        client.publish(
            f"sensors/readings", json.dumps(hardware_data))
        time.sleep(2)

    client.loop_stop()
    client.disconnect()
