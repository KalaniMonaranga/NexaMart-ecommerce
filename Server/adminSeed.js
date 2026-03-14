// Run this once to create your first Admin
const User = require('./models/User');

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@nexamart.com' });
  if (!adminExists) {
    await User.create({
      name: 'Root Admin',
      email: 'admin@nexamart.com',
      password: 'admin123password', // You will change this later
      role: 'admin'
    });
    console.log('Default Admin Created!');
  }
};