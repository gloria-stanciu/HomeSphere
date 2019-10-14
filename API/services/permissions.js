const jwt = require('jsonwebtoken');
const levelFcts = {
    public: (req, res, next) => next(),
    member: (req, res, next) => {
        const token = req.header('x-access-token');
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            console.log('ceva');
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Auth failed!', error: error });
        }
    },
};

module.exports = level => (req, res, next) => levelFcts[level](req, res, next);
