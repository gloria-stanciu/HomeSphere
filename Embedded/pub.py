import paho.mqtt.client as mqtt
import time, json


def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("Connected!")
    else:
        print("Not connected. Returned code: ", rc)

def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnected result code "+str(rc))

def on_message(client, userdata, message):
    print("message topic=",message.topic)
    print("message received " ,str(message.payload.decode("utf-8")))

broker = "167.71.42.195"

client = mqtt.Client('raspberryClientPub', protocol=mqtt.MQTTv31) #create a new instance
client.username_pw_set('gloria', 'stanciu160499')

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

print("Connecting to broker...", broker)

client.connect(broker)
client.loop_start()
client.publish("rpb","info")

client.loop_stop()
client.disconnect()