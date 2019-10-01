const express = require('express')
const router = express.Router();

const DevicesController = require ('../controllers/devices');


//get all devices with their details
router.get('/', DevicesController.devices_get_all);

//create a device
router.post("/", DevicesController.devices_create_device);

//get the details for a device
router.get('/:deviceId', DevicesController.devices_get_device);

//update a device
router.patch('/:deviceId', DevicesController.devices_patch_device);

//delete a device
router.delete('/:deviceId', DevicesController.devices_delete_device);

//add sensors data
// router.post('/:deviceId/sensors', DevicesController.add_sensor_data);

//
// router.get('/:deviceId/sensors/readings', DevicesController.devices_reading_sensors);

module.exports = router;