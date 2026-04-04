const mongoose = require('mongoose');
const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Sample data with proper image URLs
const sampleProducts = [
  {
    name: "Laptop Pro 15",
    description: "High-performance laptop for professionals",
    information: "Intel Core i7, 16GB RAM, 512GB SSD, 15.6\" display",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800"
    ],
    price: "1299.99",
    countInStock: 15,
    category: "Electronics"
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    information: "Bluetooth 5.0, 30-hour battery, active noise cancellation",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
    ],
    price: "199.99",
    countInStock: 25,
    category: "Electronics"
  },
  {
    name: "Smart Watch Ultra",
    description: "Advanced fitness and health tracking smartwatch",
    information: "Heart rate monitor, GPS, water resistant, 7-day battery",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      "https://images.unsplash.com/photo-1579586337274-166b8e0116b1?w=800"
    ],
    price: "349.99",
    countInStock: 20,
    category: "Electronics"
  },
  {
    name: "Running Shoes Pro",
    description: "Professional running shoes for athletes",
    information: "Breathable mesh, cushioned sole, lightweight design",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800"
    ],
    price: "129.99",
    countInStock: 30,
    category: "Sports"
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip exercise yoga mat",
    information: "6mm thickness, eco-friendly material, carrying strap included",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1506629905607-48e2ec7b786d?w=800"
    ],
    price: "39.99",
    countInStock: 50,
    category: "Sports"
  },
  {
    name: "Coffee Maker Deluxe",
    description: "Automatic coffee maker with grinder",
    information: "Built-in grinder, 12-cup capacity, programmable timer",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1517668800724-342e00701514?w=800"
    ],
    price: "89.99",
    countInStock: 18,
    category: "Home"
  },
  {
    name: "Designer Handbag",
    description: "Luxury leather handbag for women",
    information: "Genuine leather, multiple compartments, adjustable strap",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"
    ],
    price: "249.99",
    countInStock: 12,
    category: "Fashion"
  },
  {
    name: "Sunglasses Classic",
    description: "UV protection designer sunglasses",
    information: "Polarized lenses, durable frame, includes case",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
    ],
    price: "79.99",
    countInStock: 35,
    category: "Fashion"
  },
  {
    name: "Gaming Keyboard RGB",
    description: "Mechanical gaming keyboard with RGB lighting",
    information: "Cherry MX switches, customizable RGB, programmable keys",
    images: [
      "https://images.unsplash.com/photo-1598331608813-77e4a2b5a9e0?w=800",
      "https://images.unsplash.com/photo-1587829741301-dc798b83b3f2?w=800"
    ],
    price: "149.99",
    countInStock: 22,
    category: "Electronics"
  },
  {
    name: "Fitness Dumbbells Set",
    description: "Adjustable weight dumbbells set",
    information: "5-50 lbs adjustable, non-slip grip, compact storage",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
    ],
    price: "199.99",
    countInStock: 15,
    category: "Sports"
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional stainless steel knife set",
    information: "6-piece set, wooden block, razor sharp blades",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800"
    ],
    price: "89.99",
    countInStock: 25,
    category: "Home"
  },
  {
    name: "Winter Jacket Premium",
    description: "Warm and stylish winter jacket",
    information: "Waterproof, insulated, multiple pockets, hood included",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      "https://images.unsplash.com/photo-1544966503-7e3c4c6ce8a6?w=800"
    ],
    price: "179.99",
    countInStock: 20,
    category: "Fashion"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products`);

    // Display categories
    const categories = [...new Set(insertedProducts.map(p => p.category))];
    console.log('📦 Available categories:', categories);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
