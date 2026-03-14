const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Path to your User model

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: 'admin@nexamart.com' });

    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@nexamart.com',
        password: 'admin123password', // This will be hashed automatically by your model!
        role: 'admin',
        phone: '0000000000'
      });
      console.log('✅ Default Admin Created! Refresh MongoDB Atlas now.');
    } else {
      console.log('ℹ️ Admin already exists.');
    }
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedAdmin();