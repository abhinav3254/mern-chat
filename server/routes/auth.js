const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../jwt/jwt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


router.get('/', (req, res) => {
	res.json({ name: 'router is working fine' })
});


/**
 * This method is for login of user
 */
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const userDetails = await User.findOne({ email: email });
		if (!userDetails) {
			return res.status(404).json({ message: 'user not found' });
		}
		const isPasswordSame = await comparePassword(password, userDetails.password);
		if (isPasswordSame) {
			const user = {
				id: userDetails._id,
				email: userDetails.email
			}
			const token = generateToken(user);
			const response = {
				userId: userDetails._id,
				token: token
			}
			return res.status(200).json(response);
		}
		return res.status(400).json({ message: 'wrong password' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'internal server error' });
	}
});

/**
 * This route will let register the user
 */
router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	try {
		// checking if all the fields are there in request body or not
		if (!email || !password || !name) {
			return res.status(404).json({ message: 'all fields are mandatory' });
		}

		// checking if user already exists in database with this name
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.status(409).json({ message: 'Email already in use' });
		}
		// hashing password
		const hashPassword = await passwordHashing(password);
		const newUser = new User({ name, email, password: hashPassword });
		const databaseResponse = await newUser.save();
		return res.status(200).json({ message: 'Registration successful' })
	} catch (err) {
		return res.status(500).json({ message: 'something went wrong!' })
	}
});

/**
 * This method will hash the plain password
 */
async function passwordHashing(plainPassword) {
	const hash = await bcrypt.hash(plainPassword, saltRounds);
	return hash;
}

async function comparePassword(plainPassword, hashedPassword) {
	const match = await bcrypt.compare(plainPassword, hashedPassword);
	return match;
}


module.exports = router;