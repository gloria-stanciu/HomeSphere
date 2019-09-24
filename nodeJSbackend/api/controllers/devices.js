const mongoose = require('mongoose');

const Device = require('../models/device');
const Sensor = require('../models/sensor');

exports.devices_get_all = (req, res, next) => {
    Device
    .find()
        .select('deviceName _id location sensor')
        .populate('sensor')
        .exec()
        .then(docs => {
            res.status(200).json({
            count: docs.length, 
            device: docs.map(doc => {
                return{
                    _id: doc._id,
                    deviceName: doc.deviceName,
                    location: doc.location,
                    sensor: doc.sensor,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/devices/'+ doc._id 
                    }
                };
            })
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


exports.devices_create_device = (req, res, next) => {
    
    const device = new Device({
        _id: req.body._id,
        deviceName: req.body.deviceName,
        location: req.body.location,
        sensor: req.body.sensor
    });
    return device.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Device stored",
            createdDevice: {
                _id: result._id,
                deviceName: result.deviceName,
                location: result.location,
                sensor: result.sensor,
            },
            request:{
                type:'GET',
                url: "http://localhost:3000/devices/" + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.devices_get_device = (req, res, next) =>{
    Device.findById(req.params.deviceId)
    .populate('sensor')
    .exec()
    .then(device => {
        if(!device){
            return res.status(404).json({
                message: 'Device not found'
            });
        }
        res.status(200).json({
            device: device,
            request: {
                type: "GET",
                url: "http://localhost:3000/devices"
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
}

exports.devices_patch_device = (req, res, next) =>{
    const id = req.params.deviceId;
    const updateOperation = {};
    for(const ops of req.body){
        updateOperation[ops.propName] = ops.value;
    }
    Device.update({_id: id}, {$set: updateOperation})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Device updated',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/devices/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.devices_delete_device = (req, res, next) =>{
    Device.remove({_id: req.params.deviceId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Device deleted',
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/devices",
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

// exports.devices_add_sensor = (req, res, next) =>{
//     const id = req.params.deviceId
    // Device.update(
    //     {id: req.params._id},
    //     {$push: {sensor: req.body.sensor}},
    //     function(error, success){
    //         if(error){
    //             console.log(error);
    //         }
    //         else{
    //             console.log(success);
    //         }
    //     }
    // );
// };

exports.devices_reading_sensors = (req, res, next) => {
    id = req.params.deviceId
    Device.findById(req.params.deviceId)
        .populate('sensor')
        .exec()
        .then(device => {
            if(!device){
                return res.status(404).json({
                    message: 'Device not found'
                });
            }
            res.status(200).json({
                device: device,
                request: {
                    type: "POST",
                    url: "http://localhost:3000/sensors" + id 
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}