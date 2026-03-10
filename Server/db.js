const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Cloud Database (ClusterNM1) Connected!");
    } catch (err) {
        console.error("❌ Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;