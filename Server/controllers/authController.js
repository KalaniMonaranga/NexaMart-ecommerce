const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // You'll need this for login!
const User = require('../models/User');
const crypto = require('crypto');

// Helper to generate Token (Keep this private)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Helper to generate temporary password
const generateTempPassword = () => {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
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

// 5. FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email address" });
    }

    // Generate temporary password
    const tempPassword = generateTempPassword();
    
    // Hash the temporary password
    const salt = await bcrypt.genSalt(12);
    const hashedTempPassword = await bcrypt.hash(tempPassword, salt);

    // Update user password with temporary password
    user.password = hashedTempPassword;
    user.tempPassword = true; // Flag to indicate this is a temporary password
    await user.save();

    // Simulate sending email (in production, use nodemailer)
    console.log(`=== TEMPORARY PASSWORD FOR ${email} ===`);
    console.log(`Temporary Password: ${tempPassword}`);
    console.log(`This password will expire in 24 hours`);
    console.log(`====================================`);

    // In production, you would send an email here:
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'NexaMart - Temporary Password',
      html: `
        <h2>NexaMart Password Reset</h2>
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Here is your temporary password:</p>
        <h3 style="background: #f0f0f0; padding: 10px; display: inline-block;">${tempPassword}</h3>
        <p>This password will expire in 24 hours. Please login and change your password immediately.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br>
        <p>Best regards,<br>NexaMart Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    */

    res.json({
      message: "Temporary password has been sent to your email address",
      // For development only - remove in production
      tempPassword: tempPassword
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: "Failed to send temporary password" });
  }
};

// 6. RESET PASSWORD (after using temporary password)
const resetPassword = async (req, res) => {
  try {
    const { email, tempPassword, newPassword } = req.body;

    if (!email || !tempPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify temporary password
    const isTempPasswordValid = await bcrypt.compare(tempPassword, user.password);

    if (!isTempPasswordValid) {
      return res.status(401).json({ message: "Invalid temporary password" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password and remove temp flag
    user.password = hashedNewPassword;
    user.tempPassword = false;
    await user.save();

    res.json({
      message: "Password has been reset successfully. You can now login with your new password."
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

// 7. GET ALL USERS (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 8. DELETE USER (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  register,
  login, // Don't forget to export this!
  getUserProfile,
  updateUserProfile,
  registerAdminByAdmin,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser
};