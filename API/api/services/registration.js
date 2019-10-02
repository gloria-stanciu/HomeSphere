const mongoose = require('mongoose');

const Device = require('../models/device');
const Sensor = require('../models/sensor');

function registerOneDevice(data) {
    const device = new Device({
        _id: data.id,
        deviceName: data.deviceName,
        location: data.location,
    });
    device
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

function registerOneSensor(deviceId, data) {
    const sensor = new Sensor({
        _id: new mongoose.Types.ObjectId(),
        sensorName: data,
    });

    return sensor
        .save()
        .then(result => {
            Device.findByIdAndUpdate(
                deviceId,
                { $push: { sensor: result._id } },
                (error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(data);
                    }
                }
            );
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    registerOneDevice,
    registerOneSensor,
};
