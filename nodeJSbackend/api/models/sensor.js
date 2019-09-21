const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sensorName: {type: String, required: true},
    data: {type: Number, required: true},
    date: mongoose.Schema.Types.Date
});

module.exports = mongoose.model('Sensor', sensorSchema);