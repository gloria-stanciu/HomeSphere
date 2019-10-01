const MQTT = require('mqtt');
const { mqtt } = require('../config');

const mqttClient = MQTT.connect(mqtt.BROKER, {
    username: mqtt.USRNAM,
    password: mqtt.PASSWD,
});

mqttClient.on('error', err => {
    console.log('====  Error!  ====');
    console.log(err);
    mqttClient.end();
});

mqttClient.on('connect', () => {
    console.log(`====  MQTT Client Connected  ====`);
});

mqttClient.on('message', function(topic, message) {
    console.log('====  New Message  ====');
    console.log(
        `TOPIC\t\t${topic.toString()}\nMESSAGE\t\t${message.toString()}`
    );
});

mqttClient.on('close', () => {
    console.log(`====  MQTT Client Disconnected.   ====`);
});

module.exports = mqttClient;
