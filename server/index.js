const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();
// Here we are telling node to use json
app.use(express.json());

app.use(cors());

dotenv.config();

/**
 * in this file all the auth routes are defined
 */
app.use('/api/v1/auth', authRoutes);


/**
 * config the server to listen on the PORT number as provided
 */
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`app is up and running on port ${PORT}`);
});