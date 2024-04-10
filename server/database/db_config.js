const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


/**
 * connecting server to cloud
 */
const uri = process.env.DB_URL;
mongoose.connect(uri)
    .then(() => console.log(`connected to mongodb cloud`))
    .catch(err => console.log('something went wrong in connection to cloud', err));