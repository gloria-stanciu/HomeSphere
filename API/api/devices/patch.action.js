const mongoose = require('mongoose');
const Device = mongoose.model('Device');

async function updateDeviceById(req, res, next) {
    const id = req.params.id;
    const updateOperation = {};
    for (const ops of req.body) {
        updateOperation[ops.propName] = ops.value;
    }
    try {
        const update = await Device.findByIdAndUpdate(id, {
            $set: updateOperation,
        });
        res.status(200).send(update);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    updateDeviceById,
};
