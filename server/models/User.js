const mongoose = require('mongoose');

/**
 * User Schema is defined here
 */
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;