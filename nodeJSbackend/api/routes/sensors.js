const express = require('express');
const router = express.Router();


const SensorsController = require('../controllers/sensors')


//get all sensors with their details
router.get('/', SensorsController.sensors_get_all);

//create a sensor for a device
router.post('/:deviceId', SensorsController.sensors_create_sensor);

//get a sensor with its details
router.get('/:sensorId', SensorsController.sensors_get_sensor);

//update a sensor
router.patch('/:sensorId', SensorsController.sensor_patch_sensor);

//delete a sensor
router.delete('/:sensorId', SensorsController.sensors_delete_sensor);


module.exports = router;