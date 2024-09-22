const express = require('express');
const { UserModel } = require('../models/User');
const { generateToken } = require('../middlewares/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide required fields' });
        }


        var existingUser = await UserModel.findOne({ email: email });

        if (!existingUser) {
            const name = email.split('@')[0];
            const User = new UserModel({
                name,
                email,
                password
            });

            existingUser = await User.save();
        } else {
            if (existingUser.password !== password) {
                return res.status(400).json({ message: 'Wrong Password!' });
            }
        }



        const payload = {
            userId: existingUser._id
        }

        const response = generateToken(payload);


        if (response.status) {
            return res.status(200).json({ message: 'Login successful', token: response.message, id: existingUser._id });
        } else {
            return res.status(400).json({ message: 'Authentication Failed!' });
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;