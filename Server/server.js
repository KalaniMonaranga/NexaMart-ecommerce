// Navigates up one level to find the .env in the NEXAMART root
require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Initialize Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));