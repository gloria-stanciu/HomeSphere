const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User deleted',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deleteUser,
};
