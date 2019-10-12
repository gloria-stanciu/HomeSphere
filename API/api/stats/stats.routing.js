const { callFunctions } = require('./test.action');
const { predict } = require('./prediction.action');

module.exports = {
    '/test/:id': {
        get: {
            action: predict,
            level: 'public',
        },
    },
    '/:id': {
        get: {
            action: callFunctions,
            level: 'public',
        },
    },
};
