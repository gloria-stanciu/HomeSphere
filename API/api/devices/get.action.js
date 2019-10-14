const mongoose = require('mongoose');
const Device = mongoose.model('Device');

async function getAll(req, res, next) {
    try {
        const devices = await Device.find();
        res.status(200).send(devices);
    } catch (err) {
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
