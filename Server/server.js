require('dotenv').config({ path: '../.env' }); 

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db'); 

const app = express(); 
connectDB(); 

// 3. MIDDLEWARE & CORS (Updated to include 5175)
app.use(cors({
  origin: '*', // Set to '*' during development to prevent ALL Cors errors
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); 

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// 4. SECURITY & IMAGE HEADERS
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// 5. STATIC FOLDER (Standardized path)
const __dirname_resolved = path.resolve();
app.use('/uploads', express.static(path.join(__dirname_resolved, '/uploads')));

// 6. API ROUTES
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// 404 Handler
app.use((req, res, next) => {
  console.log('404 Handler - Route not found:', req.method, req.url);
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error("SERVER ERROR:", err.message); // Log error to terminal
  console.error("STACK:", err.stack);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 NexaMart Server running on port ${PORT}`));