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

    console.log(`Emmiting reading ${deviceId}`);
    io.emit(`reading/${deviceId}`, {
        data: {
            deviceId: deviceId,
            data: dataRead,
        },
    });

    try {
        const device = await Device.findById(deviceId).populate('sensor');

        for (const sensor of device.sensors) {
            const reading = dataRead.filter(
                reading => reading.sensorName === sensor.sensorName
            );

            await Sensor.findOneAndUpdate(
                { sensorName: reading[0].sensorName },
                { $push: { readings: reading } }
            );
        }
    } catch (err) {
        console.log(err);
    }
}

async function registerSensors(message) {
    deviceId = message.deviceId;
    try {
        const sensors = await Sensor.insertMany(message.sensors);
        console.log(sensors);
        for (const sensor of sensors) {
            Device.findByIdAndUpdate(deviceId, {
                $push: { sensor: sensor._id },
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
