const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');
const Device = mongoose.model('Device');

const io = require('../sockets');

function sendTest(client, message) {
    console.log(message);
    client.publish('testx', `{ wow: 'testx' }`);
    return;
}

let sum = [];
let count = [];
async function sendSensorReadings(client, message) {
    const deviceId = message.deviceId;
    const date = message.date;
    delete message.deviceId;
    delete message.date;

    // io.emit(`reading/${deviceId}`, {
    //     data: {
    //         deviceId: deviceId,
    //         data: dataRead,
    //     },
    // });

    function notifyUser(sensor) {
        io.emit(`/sensor/${sensor._id}`, {
            message: 'No devices in the socket',
        });
    }
    try {
        let i = 0;
        const device = await Device.findById(deviceId);
        device.sensors.forEach(async sensor => {
            const queried = await Sensor.findById(sensor).select([
                'name',
                '_id',
            ]);
            const reading = message[queried.name];

            io.emit(`/sensor/${queried._id}`, {
                data: reading,
                date: date,
            });
            if (queried.name.includes('current')) {
                sum[i] += reading;
                count[i]++;
                if (sum[i] !== 0 && count[i] === 10) {
                    notifyUser(queried);
                }
                i++;
            }
            await queried.updateOne({
                $push: {
                    readings: {
                        data: reading,
                        date: date,
                    },
                },
            });
            console.log(queried);
        });
    } catch (err) {
        console.log(err);
    }
}

async function registerSensors(client, message) {
    try {
        const device = await Device.findById(message.deviceId).populate(
            'sensors'
        );

        message.sensors.forEach(async sensor => {
            const found = device.sensors.find(el => {
                return el.name === sensor.name;
            });

            if (!found) {
                let newSensor = await Sensor.create({
                    name: sensor.name,
                    unit: sensor.unit,
                });
                await device.update({
                    $push: { sensors: newSensor._id },
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
}

/**
 * @param {mqttClient} mqttClient - MqttClient object
 * @param {Object} device - Message containing device data
 *
 * Sends back status of operation:
 * - 0: Succesfully registered
 * - 1: Already registered
 * - -1: Server error
 */
async function registerDevice(client, device) {
    statusTopic = 'devices/register/status';
    try {
        const lookup = await Device.findById(device._id);
        if (lookup) return client.publish(statusTopic, '1');

        await Device.create({
            _id: device._id,
            name: device.name,
            location: device.location,
            disk: device.disk_total,
            ram: device.ram_total,
        });
        return client.publish('devices/register/status', '0');
    } catch (err) {
        client.publish('devices/register/status', '-1');
    }
}

module.exports = {
    sendTest,
    sendSensorReadings,
    registerSensors,
    registerDevice,
};
