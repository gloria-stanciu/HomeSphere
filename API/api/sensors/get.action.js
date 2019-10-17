const mongoose = require('mongoose');

const Device = mongoose.model('Device');
const Sensor = mongoose.model('Sensor');

async function getAll(req, res, next) {
    try {
        const sensors = await Sensor.find();
        res.status(200).send(sensors);
    } catch (err) {
        next(err);
    }
}

async function getSensorById(req, res, next) {
    const id = req.params.id;
    try {
        const sensor = await Sensor.findById(id);
        const lastValues = sensor.aggregate({ $sort: { 'reading.date': -1 } });
        const currentValue = sensor.readings.slice(-1)[0];
        res.status(200).send({
            data: lastValues.data,
            date: lastValues.date,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getSensorById,
};
