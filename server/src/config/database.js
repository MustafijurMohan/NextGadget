require('dotenv').config();
const mongoose = require('mongoose');   
const URL = process.env.MONGO_URI;

exports.connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 30000, // wait up to 30 seconds
            connectTimeoutMS: 30000, 
        })
        console.log(`✅ Database Connection Successfull.`)
    } catch (error) {
        console.error("❌ Database Connection Error:", error.message);
        process.exit(1); // stop server if DB is unreachable
    }
}


// Optional: Event listeners for better debugging
// mongoose.connection.on('connected', () => console.log('MongoDB connected'));
// mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));
// mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));