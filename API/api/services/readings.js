const Device = require('../models/device');
const Sensor = require('../models/sensor');

const io = require('../sockets');

function addSensorData(deviceId, dataRead) {
    console.log(`Emmiting reading ${deviceId}`);
    io.emit(`reading/${deviceId}`, {
        data: {
            deviceId: deviceId,
            data: dataRead,
        },
    });
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
                    .then(res => console.log('added'))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}

module.exports = addSensorData;
