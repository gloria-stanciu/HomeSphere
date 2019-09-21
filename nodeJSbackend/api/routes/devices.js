const express = require('express')
const router = express.Router();

const DevicesController = require ('../controllers/devices');



router.get('/', DevicesController.devices_get_all);

router.post("/", DevicesController.devices_create_device);

router.get('/:deviceId', DevicesController.devices_get_device);

router.patch('/:deviceId', DevicesController.devices_patch_device);

router.delete('/:deviceId', DevicesController.devices_delete_device);

// router.post('/:deviceId/sensors', DevicesController.devices_add_sensor);

router.get('/:deviceId/sensors/readings', DevicesController.devices_reading_sensors);

module.exports = router;