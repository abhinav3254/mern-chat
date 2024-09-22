const express = require('express');
const { UserModel } = require('../models/User');
const router = express.Router();

router.get('/profile', async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'profile not found!' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;