const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  // Assuming you have a User model
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  // Refers to the User who sent the message
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
