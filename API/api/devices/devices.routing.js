const { deleteDeviceById } = require('./delete.action');
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
            level: 'public',
        },
        delete: {
            action: deleteDeviceById,
            level: 'public',
        },
        patch: {
            action: updateDeviceById,
            level: 'public',
        },
    },
};
