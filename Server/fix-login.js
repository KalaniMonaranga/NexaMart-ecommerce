const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
    
    // Delete existing test user
    await User.deleteOne({ email: 'test@nexamart.com' });
    
    // Create new test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@nexamart.com',
      password: 'test123',
      role: 'user'
    });
    
    console.log('Test user created successfully');
    
    // Test login
    const user = await User.findOne({ email: 'test@nexamart.com' }).select('+password');
    const isMatch = await bcrypt.compare('test123', user.password);
    console.log('Login test result:', isMatch);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestUser();
