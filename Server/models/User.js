//Duplicate customer accounts must be prevented
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // Prevents duplicates
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'support'], default: 'customer' } // RBAC requirement
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);