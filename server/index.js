const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');
// importing websocket
const WebSocket = require('ws');
const User = require('./models/User');
// importing database config
require('./database/db_config');

const app = express();
// Here we are telling node to use json
app.use(express.json());

// using cors
app.use(cors({
	origin: "*"
}));
// setting up .env
dotenv.config();

/**
 * in this file all the auth routes are defined
 */
app.use('/api/v1/auth', authRoutes);



/**
 * get the list of users
 */
app.get('/users', async (req, res) => {
	try {
		const users = User.find();
		return res.status(200).json(users);
	} catch (errr) {
		console.log(err);
		return res.status(500).json({ message: 'something went wrong' });
	}
});


/**
 * config the server to listen on the PORT number as provided
 * importing port from .env if port not found in .env file then use default
 */
const PORT = process.env.PORT | 4000;
const server = app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`app is up and running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });
wss.on('connection', function (ws) {
	console.log('new connection')
});