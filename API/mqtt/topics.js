const handlers = require('./handlers');

const topics = {
    test: handlers.sendTest,
    'sensors/readings': handlers.sendSensorReadings,
    'sensors/register': handlers.registerSensors,
    'devices/register': handlers.registerDevice,
};

module.exports = topics;
