const express = require('express');
const router = express.Router();


const SensorsController = require('../controllers/sensors')



router.get('/', SensorsController.sensors_get_all);

router.post('/:deviceId', SensorsController.sensors_create_sensor);

router.get('/:sensorId', SensorsController.sensors_get_sensor);

router.patch('/:sensorId', SensorsController.sensor_patch_sensor);

router.delete('/:sensorId', SensorsController.sensors_delete_sensor);

module.exports = router;