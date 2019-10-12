const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
    name: { type: String, required: true },
    unit: { type: String, required: true },
    alias: { type: String },
    readings: [
        {
            data: { type: Number },
            date: { type: String },
        },
    ],
});

mongoose.model('Sensor', sensorSchema);
