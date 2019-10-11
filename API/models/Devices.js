const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    disk: { type: String, required: true },
    ram: { type: String, required: true },
    sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }],
});

mongoose.model('Device', deviceSchema);
