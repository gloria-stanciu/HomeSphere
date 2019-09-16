import startup
import time

client = startup.start(client_id="raspi2")

client.loop_start()

client.subscribe("home/#")

try:
    while True:
        time.sleep(0.2)

except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()