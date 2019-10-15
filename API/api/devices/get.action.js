const mongoose = require('mongoose');
const Device = mongoose.model('Device');

async function getAll(req, res, next) {
    try {
        const devices = await Device.find().populate({
            path: 'sensors',
            select: ['name', 'unit'],
        });
        res.status(200).send(lastValue);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getDeviceById(req, res, next) {
    const id = req.params.id;
    try {
        const device = await Device.findById(id);
        res.status(200).send(device);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getDeviceById,
};
