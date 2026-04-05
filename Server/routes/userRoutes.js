const express = require('express');
const router = express.Router();

// 1. Import Middleware
const { protect, admin } = require('../middleware/authMiddleware');

// 2. Import Controller Functions
const { 
  register,      // Added
  login,         // Added
  getUserProfile, 
  updateUserProfile, 
  registerAdminByAdmin,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser
} = require('../controllers/authController'); 

// --- DEBUG LOGS ---
console.log("✅ Routes Loaded: Auth Functions verified.");

// --- TEST ROUTE ---
router.get('/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test route working!' });
});

// --- PUBLIC ROUTES (No Token Needed) ---
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// --- PROTECTED ROUTES (Token Needed) ---
// Profile Route (Get data or Update data)
router.route('/profile')
  .get(protect, getUserProfile) 
  .put(protect, updateUserProfile);

// --- ADMIN ONLY ROUTES ---
// Only an existing Admin can register another Admin
router.post('/register-admin', protect, admin, registerAdminByAdmin);

// Get all users and delete user (Admin only)
router.route('/')
  .get(protect, admin, getAllUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;