const addSensorData = require('../api/services/readings');
const {
    registerOneDevice,
    registerOneSensor,
} = require('../api/services/registration');

function sendTest(message) {
    console.log(message);
}

function sendSensorReadings(message) {
    addSensorData(message.deviceId, message.data);
}

function registerSensors(message) {
    deviceId = message.deviceId;
    for (sensor of message.sensors) {
        registerOneSensor(deviceId, sensor);
    }
}

function registerDevice(message) {
    registerOneDevice(message);
}

module.exports = {
    sendTest,
    sendSensorReadings,
    registerSensors,
    registerDevice,
};
