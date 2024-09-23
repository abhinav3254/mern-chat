const express = require('express');
const MessageModel = require('../models/MessageModel');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const selectedUserId = req.params.id;
        const loggedInUserId = req.userId;

        // Find messages between the logged-in user and the selected user
        const history = await MessageModel.find({
            $or: [
                { sender: loggedInUserId, recipient: selectedUserId },
                { sender: selectedUserId, recipient: loggedInUserId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by timestamp (ascending)

        return res.status(200).json(history);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;