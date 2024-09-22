const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, // URL of the user's profile picture
    },
    status: {
        type: String, // e.g., "Online", "Away", "Busy"
        default: "Online"
    },
    lastActive: {
        type: Date // Timestamp of the last time the user was active
    },
    bio: {
        type: String, // Short bio or description
        default: ""
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId, // Array of User IDs for friends
        ref: 'users'
    }],
    notifications: [{
        type: String // Array of notification messages
    }],
    chatHistory: [{
        type: mongoose.Schema.Types.ObjectId, // Array of chat message IDs
        ref: 'messages'
    }]
}, { timestamps: true });

const UserModel = mongoose.model('users', User);

module.exports = { UserModel };
