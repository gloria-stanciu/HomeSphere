const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');
const Device = mongoose.model('Device');

const io = require('../sockets');

function sendTest(message) {
    console.log(message);
}

async function sendSensorReadings(message) {
    const deviceId = message.deviceId;
    const dataRead = message.data;
    console.log(dataRead);

    io.emit(`reading/${deviceId}`, {
        data: {
            deviceId: deviceId,
            data: dataRead,
        },
    });

    try {
        const device = await Device.findById(deviceId).populate('sensors');
        for (const sensor of device.sensors) {
            const reading = dataRead.filter(
                reading => reading.sensorName === sensor.name
            );
            console.log(reading);

            await Sensor.findOneAndUpdate(
                { name: reading[0].sensorName },
                { $push: { readings: reading } }
            );
        }
    } catch (err) {
        console.log(err);
    }
}

async function registerSensors(message) {
    const deviceId = message.deviceId;
    try {
        for (const toAdd of message.sensors) {
            let newSensor = await Sensor.create({
                name: toAdd.name,
                unit: toAdd.unit,
            });
            await Device.findByIdAndUpdate(deviceId, {
                $push: { sensors: newSensor._id },
            });
        }
    } catch (err) {
        console.log(err);
    }
}

async function registerDevice(device) {
    try {
        const inserted = await Device.create({
            _id: device._id,
            name: device.name,
            location: device.location,
        });
        console.log(inserted);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sendTest,
    sendSensorReadings,
    registerSensors,
    registerDevice,
};
