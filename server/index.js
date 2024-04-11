const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');
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
 * config the server to listen on the PORT number as provided
 * importing port from .env if port not found in .env file then use default
 */
const PORT = process.env.PORT | 4000;
app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`app is up and running on port ${PORT}`);
});