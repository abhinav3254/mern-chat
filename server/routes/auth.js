const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
	res.json({ name: 'router is working fine' })
});


/**
 * This method is for login of user
 */
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	res.json(req.body);
});

/**
 * This route will let register the user
 */
router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	const newUser = new User({ name, email, password });
	const databaseResponse = await newUser.save();
	console.log(databaseResponse);
	res.json(req.body);
});



module.exports = router;