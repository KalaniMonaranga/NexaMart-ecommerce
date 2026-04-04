const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// 1. MULTER CONFIGURATION (Unique Filenames)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Result: 1710842400000.jpg (ensures no duplicates)
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// ---------------------------------------------------------
// 2. THE POST ROUTE (Security Added)
// ---------------------------------------------------------
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, countInStock, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      countInStock,
      category,
      // 🟢 FIX: Wrap the path in an array to match your Mongoose Model
      images: [`/uploads/${req.file.filename}`] 
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ---------------------------------------------------------
// 3. THE GET ROUTE
// ---------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;