const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Device = mongoose.model('Device');

async function signUp(req, res, next) {
    try {
        const username = await User.findOne({ username: req.body.username });
        const email = await User.findOne({ email: req.body.email });
        if (username) return res.status(409).send('Username already taken');
        if (email) return res.status(409).send('E-mail already taken');
    } catch (err) {
        res.status(500).json({ error: err });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then(result => {
                res.status(201).send(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    });
}

async function logIn(req, res, next) {
    if (!req.body.username) return res.status(400).send('Username required');
    if (!req.body.password) return res.status(400).send('Password required');
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json({ message: 'Auth failed!' });
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.status(401).json({ message: 'Auth error!' });
            if (result) {
                const token = jwt.sign(
                    {
                        username: user.username,
                        userId: user._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '7d',
                    }
                );
                return res.status(200).send(token);
            } else return res.status(401).json({ message: 'Auth failed!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

async function addDevices(req, res, next) {
    const { userId } = jwt.decode(req.header('x-access-token'));
    const user = await User.findById(userId);
    const devices = req.body;

    try {
        for (const id of devices) {
            const query = await Device.findById(id);
            if (!query)
                return res.status(401).json({ error: 'Device not found' });

            const searchDevice = user.devices.find(deviceId => {
                return id === deviceId;
            });

            if (searchDevice)
                return res.status(500).json(`Device ${id} already exists`);

            await user.updateOne({ $push: { devices: query._id } });
        }
        return res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    signUp,
    logIn,
    addDevices,
};
