const { getAll, getSensorById } = require('./get.action');
const { createAlias } = require('./getAlias.action');
const { deleteSensorById } = require('./delete.action');

module.exports = {
    '/': {
        get: {
            action: getAll,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: getSensorById,
            level: 'public',
        },
        delete: {
            action: deleteSensorById,
            level: 'member',
        },
    },
    '/createAlias/:id': {
        post: {
            action: createAlias,
            level: 'member',
        },
    },
};
