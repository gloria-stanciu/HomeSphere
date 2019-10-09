const { getAll, getSensorById } = require('./get.action');

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
    }
};
