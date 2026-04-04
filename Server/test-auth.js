const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testUserCreation() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected');
    
    // Delete existing test user
    await User.deleteOne({ email: 'testuser@example.com' });
    
    // Create new user
    console.log('Creating user...');
    const newUser = await User.create({ 
      name: 'Test User', 
      email: 'testuser@example.com', 
      password: 'password123', 
      role: 'user'
    });
    
    console.log('✅ User created successfully:', {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
    
    // Test login
    console.log('\\nTesting login...');
    const user = await User.findOne({ email: 'testuser@example.com' }).select('+password');
    console.log('User found:', !!user);
    console.log('Password exists:', !!user?.password);
    
    if (user && user.password) {
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare('password123', user.password);
      console.log('Password match:', isMatch);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testUserCreation();
