const MQTT = require('mqtt');
const { mqtt } = require('../config');
const topics = require('./topics');

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

for (const topic of Object.keys(topics)) {
    mqttClient.subscribe(topic, (err, granted) => {
        if (err) {
            console.log(err);
        } else {
            console.log(granted);
        }
    });
}

mqttClient.on('message', (topic, message) => {
    try {
        const jsonMessage = JSON.parse(message.toString());
        topics[topic](mqttClient, jsonMessage);
    } catch (err) {
        topics[topic](mqttClient, message.toString());
    }
});

mqttClient.on('close', () => {
    console.log(`====  MQTT Client Disconnected.   ====\n`);
});

module.exports = mqttClient;
