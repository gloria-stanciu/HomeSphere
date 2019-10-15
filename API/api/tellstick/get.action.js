const mongoose = require('mongoose');
const { telldusApi, oauth } = require('../../services/requests');

function clientsList(req, res, next) {
    telldusApi.get(
        '/clients/list',
        {
            oauth: {
                ...oauth,
            },
        },
        function(error, response, body) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(JSON.parse(body));
        }
    );
}

function devicesList(req, res, next) {
    telldusApi.get(
        '/devices/list',
        {
            oauth: { ...oauth },
        },
        function(error, response, body) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(JSON.parse(body));
        }
    );
}

function deviceTurnOff(req, res, next) {
    telldusApi.get(
        '/device/turnOff',
        {
            qs: {
                id: '5306917',
            },
            oauth: { ...oauth },
        },
        function(error, response, body) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(JSON.parse(body));
        }
    );
}

function deviceTurnOn(req, res, next) {
    telldusApi.get(
        '/device/turnOn',
        {
            qs: {
                id: '5306917',
            },
            oauth: { ...oauth },
        },
        function(error, response, body) {
            if (error) return res.status(500).send(error);
            return res.status(200).send(JSON.parse(body));
        }
    );
}

module.exports = { clientsList, devicesList, deviceTurnOff, deviceTurnOn };
