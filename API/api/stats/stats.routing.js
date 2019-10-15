const { callFunctions } = require('./get.action');
const { predict } = require('./prediction.action');

module.exports = {
    '/prediction/:id': {
        get: {
            action: predict,
            level: 'member',
        },
    },
    '/:id': {
        get: {
            action: callFunctions,
            level: 'member',
        },
    },
};
