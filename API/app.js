require('dotenv').config();
require('pretty-error').start();

const { db, port } = require('./config');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routing = require('lumie');
const cors = require('cors');
const helmet = require('helmet');
const read = require('fs').readdirSync;
const join = require('path').join;
const http = require('http').Server(app);

const models = join(__dirname, './models');
read(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

module.exports = io = require('socket.io')(http);

require('./sockets');
require('./mqtt');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routing.load(app, {
    preURL: 'api',
    verbose: true,
    ignore: ['*.spec', '*.action', '*.html'],
    permissions: require('./services/permissions.js'),
    controllers_path: join(__dirname, 'api'),
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error);
    res.send(error);
});

try {
    mongoose.connect(
        `mongodb+srv://${db.USER}:${db.PASS}@${db.HOST}/${db.NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    );
} catch (err) {
    console.log('Mongo DB Error');
    console.log(err);
}

http.listen(port, function() {
    console.log(`\nServer listening on http://localhost:${port}\n`);
});
