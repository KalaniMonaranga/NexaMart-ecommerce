const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: '../.env' });

const seedProducts = [
  {
    name: "NexaPhone Pro",
    description: "Latest 5G smartphone with OLED display",
    price: 999,
    category: "Electronics",
    countInStock: 10,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    name: "UltraLight Laptop",
    description: "High performance for software developers",
    price: 1500,
    category: "Electronics",
    countInStock: 5,
    imageUrl: "https://via.placeholder.com/150"
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany(); // Clears old data so you don't have duplicates
    await Product.insertMany(seedProducts);
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();