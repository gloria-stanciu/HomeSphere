const io = require('../app');

io.on('connection', socket => {
    console.log('Client connected');
});

module.exports = io;
