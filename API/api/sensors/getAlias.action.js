const mongoose = require('mongoose');

const Sensor = mongoose.model('Sensor');

async function createAlias(req, res, next) {
    try {
        const id = req.params.id;
        const alias = req.body.alias;

        const update = await Sensor.findOneAndUpdate(
            { _id: id },
            {
                $set: { alias: alias },
            }
        );
        res.status(200).send(update);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAlias,
};
