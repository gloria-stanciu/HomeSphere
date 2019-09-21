const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceName: {type: String, required: true},
    location: {type: String, required: true},
    sensor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sensor'}]
});

module.exports = mongoose.model('Device', deviceSchema);