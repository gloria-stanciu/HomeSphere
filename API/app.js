require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http').Server(app);

module.exports = io = require('socket.io')(http);
require('./api/sockets');
require('./mqtt');

const { db, port } = require('./config');

const deviceRoutes = require('./api/routes/devices');
const sensorRoutes = require('./api/routes/sensors');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/devices', deviceRoutes);
app.use('/sensors', sensorRoutes);

io.on('connection', socket => {
    console.log('Client connected');
    socket.on('pig', data => {
        console.log(data);
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

try {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
        `mongodb+srv://${db.USER}:${db.PASS}@${db.HOST}/${db.NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    mongoose.Promise = global.Promise;
} catch (err) {
    console.log('Mongo DB Error');
    console.log(err);
}

http.listen(port, function() {
    console.log(`Server listening on http://localhost:${port}`);
});
