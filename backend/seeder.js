const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Classic Organic Honey',
    description: '500g bottle of pure organic honey from local farms.',
    price: 11.99,
    originalPrice: 14.99,
    image: 'https://placehold.co/300x300?text=Organic+Honey',
    images: ['https://placehold.co/300x300?text=Organic+Honey'],
    category: 'grocery',
    stock: 80,
    sold: 25,
    featured: true,
    bestSeller: true,
    newArrival: false,
    tags: ['honey', 'organic', 'natural', 'grocery'],
  },
  {
    name: 'Slim Laptop Backpack',
    description: 'Water-resistant laptop backpack with multiple compartments.',
    price: 39.95,
    originalPrice: 55.0,
    image: 'https://placehold.co/300x300?text=Laptop+Backpack',
    images: ['https://placehold.co/300x300?text=Laptop+Backpack'],
    category: 'fashion',
    stock: 45,
    sold: 15,
    featured: false,
    bestSeller: true,
    newArrival: true,
    tags: ['backpack', 'outdoor', 'laptop', 'fashion'],
  },
  {
    name: 'Bluetooth Over-Ear Headphones',
    description: 'Comfortable headphones with noise cancellation and 20h battery.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://placehold.co/300x300?text=Headphones',
    images: ['https://placehold.co/300x300?text=Headphones'],
    category: 'electronics',
    stock: 120,
    sold: 84,
    featured: true,
    bestSeller: true,
    newArrival: true,
    tags: ['headphones', 'bluetooth', 'audio', 'electronics'],
  },
  {
    name: 'Ceramic Mug Set (4-pack)',
    description: 'Stylish kitchen mug set, microwave and dishwasher safe.',
    price: 24.5,
    originalPrice: 34.5,
    image: 'https://placehold.co/300x300?text=Mug+Set',
    images: ['https://placehold.co/300x300?text=Mug+Set'],
    category: 'home',
    stock: 60,
    sold: 32,
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: ['mugs', 'kitchen', 'home', 'dinnerware'],
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Existing products removed.');

    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products.`);

    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

importData();