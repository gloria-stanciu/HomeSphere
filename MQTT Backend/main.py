import time
import controllers

client = controllers.start(client_id="mqtt_backend")
print(client)
client.loop_start()

client.subscribe("$SYS/#")
# client.subscribe("register/#")

try:
    while True:
        time.sleep(0)

except KeyboardInterrupt:
    print("exiting")
    client.disconnect()
    client.loop_stop()
