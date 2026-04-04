const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testLoginDirectly() {
  try {
    console.log('=== DIRECT LOGIN TEST ===');
    
    // Connect to database
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
    
    // Find user
    const user = await User.findOne({ email: 'test@nexamart.com' }).select('+password');
    console.log('User found:', !!user);
    console.log('Password exists:', !!user?.password);
    
    if (user && user.password) {
      console.log('Testing password comparison...');
      const isMatch = await bcrypt.compare('test123', user.password);
      console.log('Password match result:', isMatch);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Direct test failed:', error);
    process.exit(1);
  }
}

testLoginDirectly();
