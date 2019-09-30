const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sensorName: {type: String, required: true, unique: true},
    readings: [{
        data: {type: Number},
        date: {type: String}
    }]
});

module.exports = mongoose.model('Sensor', sensorSchema);