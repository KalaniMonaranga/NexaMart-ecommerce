const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); 
const { protect, admin } = require('../middleware/authMiddleware');

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 1. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch products" });
  }
});

// 2. CREATE PRODUCT
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, countInStock, category, information } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const product = new Product({
      name,
      price,
      description,
      information,
      countInStock,
      category,
      images: [`/uploads/${req.file.filename}`], 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("POST ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// 3. GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Product ID' });
  }
});

// 4. UPDATE PRODUCT
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, price, description, countInStock, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// 5. DELETE PRODUCT 
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    // 🟢 Debug log to see who is trying to delete
    console.log(`Delete request for ${req.params.id} from user: ${req.user._id}`);
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ message: 'Server Error: Could not delete' });
  }
});

module.exports = router;