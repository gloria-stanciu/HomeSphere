from src.mqtt import start
import time

client = start(client_id="raspi")

client.loop_start()
client.subscribe("rpb")
client.publish("rpb", "first message")

time.sleep(4)

client.loop_stop()
client.disconnect()
