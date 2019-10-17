const { deleteDeviceById, deleteSensorFromDevice } = require('./delete.action');
const { getAll, getDeviceById } = require('./get.action');
const { updateDeviceById } = require('./patch.action');

module.exports = {
    '/': {
        get: {
            action: getAll,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: getDeviceById,
            level: 'member',
        },
        delete: {
            action: deleteDeviceById,
            level: 'member',
        },
        patch: {
            action: updateDeviceById,
            level: 'member',
        },
    },
};
