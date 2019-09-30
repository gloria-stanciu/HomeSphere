const mongoose = require('mongoose');

const Device = require('../models/device');
const Sensor = require('../models/sensor');

exports.sensors_get_all = (req, res, next) => {
    Sensor.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            sensor: docs
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.sensors_create_sensor = (req, res, next) => {
    console.log(req.body);
    const sensor = new Sensor({
        _id: new mongoose.Types.ObjectId(),
        sensorName:  req.body.sensorName,
    });

    return sensor.save()
        .then(result => {
            device = req.params.deviceId;
            Device.findByIdAndUpdate(
                req.params.deviceId,
                {$push:  {sensor: result._id}},
                (error, data) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log(data);
                    }
                }
            );
            res.status(201).json({
                message: 'Created sensor successfully',
                createdSensor: {
                    sensorName: result.sensorName, 
                    _id: result._id,
                    readings: [{data: result.data, date: result.date}],
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/devices/' + device  + '/sensors/readings'
                    }
                }
            });
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });

}

exports.sensors_get_sensor = (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.findById(id)
    .select('sensorName _id data date')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                sensor: doc, 
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/sensors'
                }
            });
        }
        else{
            res.status(404).json({message: 'No valud entry found for the provided ID'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
}

exports.sensor_patch_sensor = (req, res, nest) =>{
    const id = req.params.sensorId;
    const updateOperation = {};
    for(const ops of req.body){
        updateOperation[ops.propName] = ops.value;
    }
    Sensor.update({_id:id}, {$set: updateOperation})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Sensor updated',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/sensors/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.sensors_delete_sensor = (req, res, next) => {
    const id = req.params.sensorId;
    Sensor.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Sensor deleted',
            request:{
                type:'POST',
                url: 'http://localhost:3000/sensors',
                body: {sensorName: 'String', data: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err});
    });
}

