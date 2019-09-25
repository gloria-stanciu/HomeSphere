import os
import requests
import json


def on_message(client, userdata, message):
    print("\nMessage topic: ", message.topic)
    if message.topic == "register":
        registerDevice(json.loads(
            str(message.payload.decode("utf-8", "ignore"))))

    else:
        msg = str(message.payload.decode("utf-8", "ignore"))
        dictMsg = json.loads(msg)

        _id = dictMsg["_id"]
        del dictMsg["_id"]

        # for sensor in dictMsg:

    f = open("logs", "a+")
    f.write(F'{message.topic}\t {msg}\n')
    f.close()


def registerDevice(dict):
    print(F"Registering a device {dict['_id']}")
    post = requests.post("http://glos.digital:3000/devices", data=dict)
    print(post.text)


def sensorStats(dict):
    print(F"Sending sensor stats")
