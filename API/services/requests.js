const request = require('request');

const telldusApi = request.defaults({
    baseUrl: 'https://api.telldus.com/json',
});

const oauth = {
    consumer_key: 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU',
    consumer_secret: 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF',
    token: 'a9efe3be3e675095eca99a5b8f7c698f05d990304',
    token_secret: 'ec9e7ad3a4cbcbb39d6b08b2de6313ad',
};

module.exports = {
    telldusApi,
    oauth,
};
