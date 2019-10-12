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
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getUserById,
};
