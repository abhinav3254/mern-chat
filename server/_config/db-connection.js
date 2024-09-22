const mongoose = require('mongoose');
const { db_url } = require('../_config/config')

async function connectDb() {
    console.log(`trying to connect to db`);
    try {
        const cnn = await mongoose.connect(db_url);
        console.log('connected to db', cnn.connections[0].host)
    } catch (err) {
        console.log('failed to connect to db...');
    }
}

module.exports = { connectDb };