import paho.mqtt.client as mqtt #importing client class
import time, socket

def on_log(client, userdata, level, buf):
    print("log: "+buf)

def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("Connected ok")
    else:
        print("Bad connection returned code= ", rc)

def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnect result code " +str(rc))

def on_message(client, userdata, msg):
    topic = msg.topic
    m_decode = str(msg.payload.decode("utf-8"))
    print("message received ", m_decode)

broker = "167.71.42.195"

client = mqtt.Client('raspberryClient', protocol=mqtt.MQTTv31) #create a new instance
client.username_pw_set('gloria', 'stanciu160499')

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_log = on_log
client.on_message = on_message

print("Connecting to broker...", broker)

client.connect(broker) #connect to broker
client.loop_start()
client.subscribe("rpb")
client.publish("rpb", "first message")
# port=1883
time.sleep(4)

client.loop_stop()
client.disconnect()

