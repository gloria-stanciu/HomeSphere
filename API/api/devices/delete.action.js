const mongoose = require('mongoose');
const Device = mongoose.model('Device');

async function deleteDeviceById(req, res, next) {
    try {
        const removed = await Device.findByIdAndDelete(req.params.id);
        res.status(200).send(removed);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deleteDeviceById,
};
