import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("Connected!")
    else:
        print("Not connected. Returned code: ", rc)

def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnected result code "+str(rc))

def on_message(client, userdata, message):
    print("\nMessage topic: ", message.topic)
    print("Message received: " ,str(message.payload.decode("utf-8")))

def on_publish(mqttc, obj, mid):
    print("mid: " + str(mid))
    pass


def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

broker = "167.71.42.195"

client = mqtt.Client('raspberryClientSub', protocol=mqtt.MQTTv31) #create a new instance
client.username_pw_set('gloria', 'stanciu160499')

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.on_publish = on_publish
client.on_subscribe = on_subscribe
client.on_message

print("Connecting to broker...", broker)
client.connect(broker)
# client.publish("rpb", "first message").wait_for_publish()

client.loop_start()

client.subscribe("rpb")
 
try:
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()


