const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDB;