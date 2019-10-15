const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');

async function deleteSensorById(req, res, next) {
    try {
        const removed = await Sensor.findByIdAndDelete(req.params.id);
        res.status(200);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deleteSensorById,
};
