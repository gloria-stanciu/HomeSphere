const { signUp, logIn, addDevices } = require('./post.action');
const { deleteUser } = require('./delete.action');
const { getAll, getUserById } = require('./get.action');

module.exports = {
    '/': {
        get: {
            action: getAll,
            level: 'checkAuth',
        },
    },
    '/:id': {
        get: {
            action: getUserById,
            level: 'checkAuth',
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
            level: 'checkAuth',
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
            level: 'checkAuth',
        },
    },
};
