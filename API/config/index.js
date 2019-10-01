require('dotenv').config();

const db = {
    USER: process.env.MONGO_USER,
    PASS: process.env.MONGO_PASS,
    NAME: process.env.MONGO_DB,
    HOST: process.env.MONGO_HOST,
};

const mqtt = {
    BROKER: process.env.MQTT_BROKER,
    USRNAM: process.env.MQTT_USRNAM,
    PASSWD: process.env.MQTT_PASSWD,
};

module.exports = {
    db,
    mqtt,
};
