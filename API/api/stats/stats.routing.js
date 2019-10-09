const { callFunctions, data } = require('./test.action');

module.exports = {
    '/:id': {
        get: {
            action: callFunctions,
            level: 'public',
        },
    },
};
