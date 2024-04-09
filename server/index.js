const express = require('express');
const authRoutes = require('./routes/auth');


const app = express();
// Here we are telling node to use json
app.use(express.json());


/**
 * in this file all the auth routes are defined
 */
app.use('/api/v1/auth', authRoutes);


/**
 * config the server to listen on the PORT number as provided
 */
const PORT = 4000;
app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`app is up and running on port ${PORT}`);
});