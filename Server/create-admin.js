const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to database');
    
    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@nexamart.com' });
    
    // Create default admin user
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = await User.create({
      name: 'NexaMart Admin',
      email: 'admin@nexamart.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+94 77 123 4567',
      address: 'Colombo, Sri Lanka'
    });
    
    console.log('✅ Default admin user created successfully!');
    console.log('\n🔑 ADMIN LOGIN CREDENTIALS:');
    console.log('==============================');
    console.log('Email: admin@nexamart.com');
    console.log('Password: admin123');
    console.log('Role: Administrator');
    console.log('==============================');
    
    // Verify the admin was created
    const verifyAdmin = await User.findOne({ email: 'admin@nexamart.com' });
    console.log(`\n✅ Verification: Admin user found with ID: ${verifyAdmin._id}`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
