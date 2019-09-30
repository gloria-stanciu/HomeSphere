def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected!")
    else:
        print("Not connected. Returned code: ", rc)
