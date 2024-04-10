const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');


function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '365d',
    };
    return jwt.sign(payload, secret, options);
}

module.exports = { generateToken }