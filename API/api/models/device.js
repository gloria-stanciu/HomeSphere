const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    _id: { type: String, required: true },
    deviceName: { type: String, required: true },
    location: { type: String, required: true },
    sensor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }],
});

module.exports = mongoose.model('Device', deviceSchema);
