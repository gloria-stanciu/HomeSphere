const {
    clientsList,
    devicesList,
    deviceTurnOff,
    deviceTurnOn,
} = require('./get.action');

module.exports = {
    '/clientsList': {
        get: {
            action: clientsList,
            level: 'public',
        },
    },
    '/devicesList': {
        get: {
            action: devicesList,
            level: 'public',
        },
    },
    '/device/TurnOff': {
        get: {
            action: deviceTurnOff,
            level: 'public',
        },
    },
    '/device/TurnOn': {
        get: {
            action: deviceTurnOn,
            level: 'public',
        },
    },
};
