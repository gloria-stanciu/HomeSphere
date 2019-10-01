const db = {
    USER: process.env.MONGO_USER,
    PASS: process.env.MONGO_PASS,
    NAME: process.env.MONGO_DB,
    HOST: process.env.MONGO_HOST,
};

const mqtt = {
    BROKER: process.env.MQTT_BROKER, // "167.71.42.195"
    CLIENT: process.env.MQTT_CLIENT,
    USRNAM: process.env.MQTT_USRNAM, // = "gloria"
    PASSWD: process.env.MQTT_PASSWD, //__passwd__ = "stanciu160499"
};

module.exports = {
    db,
    mqtt,
};

// PROTCL: mqtt.MQTTv31
