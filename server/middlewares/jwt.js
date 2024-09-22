const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../_config/config')


function generateToken(payload) {
    try {
        const options = {
            expiresIn: '9000h'
        }
        const token = jwt.sign(payload, jwt_secret, options);

        return { status: true, message: token };
    } catch (err) {
        console.log('error in generating token', err.message);
        return { status: false, error: err.message };
    }
}


function validateToken(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const result = jwt.verify(token, jwt_secret);
        if (!result) {
            return res.status(401).json({ message: 'UNAUTHORIZED_ACCESS' });
        }
        req.userId = jwt.decode(token).userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'UNAUTHORIZED_ACCESS' });
    }
}

function parseToken(token) {
    try {
        console.log('parsing token...')
        const result = jwt.verify(token, jwt_secret);
        if (!result) return { status: false };
        return { status: true, id: jwt.decode(token).userId };
    } catch (err) {
        return { status: false };
    }
}

module.exports = { generateToken, validateToken, parseToken }