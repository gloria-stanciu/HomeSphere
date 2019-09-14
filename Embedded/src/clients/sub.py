from src.mqtt import start
import time

client = start(client_id="raspi")

client.loop_start()

client.subscribe("rpb")

try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()


