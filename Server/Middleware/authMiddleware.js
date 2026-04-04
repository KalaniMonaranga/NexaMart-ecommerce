const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Protect Middleware (Verify JWT Token)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (excluding password for security)
      req.user = await User.findById(decoded.id).select('-password');

      // 🟢 CRITICAL: Check if user still exists in DB
      if (!req.user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }

      return next(); // Use 'return' to ensure the function stops here
    } catch (error) {
      console.error("Token Error:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 🟢 If no token was found at all
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 2. Admin Middleware (Check Role)
// 2. Admin Middleware (Check Role)
const admin = (req, res, next) => {
  // 🟢 Change .role === 'admin' to .isAdmin if that is what's in your DB
  if (req.user && (req.user.isAdmin === true || req.user.role === 'admin')) {
    next(); 
  } else {
    // 403 is better for "Forbidden" than 401
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};
module.exports = { protect, admin };