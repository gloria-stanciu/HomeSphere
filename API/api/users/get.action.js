const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

async function getAll(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const { userId } = jwt.decode(req.header('x-access-token'));
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getUserById,
};
