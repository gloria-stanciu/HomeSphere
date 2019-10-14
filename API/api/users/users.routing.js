const { signUp, logIn, addDevices } = require('./post.action');
const { deleteUser } = require('./delete.action');
const { getAll, getUserById } = require('./get.action');

module.exports = {
    '/': {
        get: {
            action: getAll,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: getUserById,
            level: 'member',
        },
    },
    '/auth': {
        post: {
            action: signUp,
            level: 'public',
        },
    },
    '/auth/:id': {
        delete: {
            action: deleteUser,
            level: 'member',
        },
    },
    '/login': {
        post: {
            action: logIn,
            level: 'public',
        },
    },
    '/devices': {
        post: {
            action: addDevices,
            level: 'member',
        },
    },
};
