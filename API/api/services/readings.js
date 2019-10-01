const mongoose = require('mongoose');

const Device = require('../models/device');
const Sensor = require('../models/sensor');

const io = require('../../server');

function addSensorData(deviceId, dataRead) {
    Device.findById(deviceId)
        .populate('sensor')
        .exec()
        .then(sns => {
            for (const sensor of sns.sensor) {
                const reading = dataRead.filter(
                    reading => reading.sensorName === sensor.sensorName
                );
                Sensor.findOneAndUpdate(
                    { sensorName: reading[0].sensorName },
                    {
                        $push: {
                            readings: reading,
                        },
                    }
                )
                    .exec()
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    io.emit(dataRead);
}

module.exports = addSensorData;
