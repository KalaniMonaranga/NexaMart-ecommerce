const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // You'll need this for login!
const User = require('../models/User');

// Helper to generate Token (Keep this private)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. REGISTER NEW CUSTOMER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: 'user'
    });
    
    // Send back the token so they are logged in immediately after signup
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id) 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW: LOGIN FUNCTION (Essential for NexaMart)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user with password - explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Debug: Check if password exists
    if (!user.password) {
      console.error('User password is undefined for user:', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Debug: Log password info (remove in production)
    console.log('Password type:', typeof user.password);
    console.log('Password length:', user.password.length);

    // Compare passwords with additional safety checks
    if (typeof password !== 'string' || typeof user.password !== 'string') {
      console.error('Password types invalid');
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// 2. GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    // req.user is populated by your 'protect' middleware
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.profilePic = req.body.profilePic || user.profilePic;

      // Logic for password update if they provide a new one
      if (req.body.newPassword) {
        // Verify current password if provided
        if (req.body.currentPassword) {
          const userWithPassword = await User.findById(req.user._id).select('+password');
          const isMatch = await bcrypt.compare(req.body.currentPassword, userWithPassword.password);
          
          if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
          }
        } else {
          return res.status(400).json({ message: "Current password is required to change password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        message: "Profile updated successfully!"
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. REGISTER ADMIN (Used by an existing Admin)
const registerAdminByAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      phone, 
      role: 'admin' // Forced to admin role
    });

    res.status(201).json({ message: "New Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login, // Don't forget to export this!
  getUserProfile,
  updateUserProfile,
  registerAdminByAdmin
};