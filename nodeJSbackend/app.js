require('dotenv').config()

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const deviceRoutes = require('./api/routes/devices'); 
const sensorRoutes = require('./api/routes/sensors');

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_DB = process.env.MONGO_DB
const MONGO_HOST = process.env.MONGO_HOST

mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Aloow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
 
app.use('/devices', deviceRoutes);
app.use('/sensors', sensorRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;