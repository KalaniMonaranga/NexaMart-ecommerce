require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const comprehensiveSampleProducts = [
  // Grocery and Hampers
  {
    name: "Premium Tea Collection",
    price: 1250,
    category: "Grocery and Hampers",
    countInStock: 45,
    description: "Premium Ceylon tea collection with assorted flavors",
    images: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300"]
  },
  {
    name: "Organic Coconut Oil",
    price: 890,
    category: "Grocery and Hampers",
    countInStock: 60,
    description: "Pure organic coconut oil for cooking and beauty",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"]
  },
  {
    name: "Spice Box Set",
    price: 2100,
    category: "Grocery and Hampers",
    countInStock: 30,
    description: "Complete spice box with Sri Lankan authentic spices",
    images: ["https://images.unsplash.com/photo-1546548970-71785318a17b?w=300"]
  },
  {
    name: "Rice Flour Pack",
    price: 450,
    category: "Grocery and Hampers",
    countInStock: 80,
    description: "High-quality rice flour for traditional cooking",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"]
  },
  {
    name: "Hampers Gift Box",
    price: 3500,
    category: "Grocery and Hampers",
    countInStock: 25,
    description: "Luxury gift hamper with assorted local products",
    images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300"]
  },

  // Fruits
  {
    name: "Fresh Mangoes",
    price: 650,
    category: "Fruits",
    countInStock: 40,
    description: "Sweet and juicy tropical mangoes",
    images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?w=300"]
  },
  {
    name: "Pineapple Fresh",
    price: 380,
    category: "Fruits",
    countInStock: 35,
    description: "Fresh ripe pineapples from local farms",
    images: ["https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300"]
  },
  {
    name: "Banana Bunch",
    price: 280,
    category: "Fruits",
    countInStock: 50,
    description: "Fresh locally grown bananas",
    images: ["https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=300"]
  },
  {
    name: "Orange Pack",
    price: 520,
    category: "Fruits",
    countInStock: 45,
    description: "Fresh vitamin C rich oranges",
    images: ["https://images.unsplash.com/photo-1547514701-42782101795e?w=300"]
  },
  {
    name: "Grapes Bundle",
    price: 750,
    category: "Fruits",
    countInStock: 30,
    description: "Sweet seedless grapes",
    images: ["https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300"]
  },

  // Food and Restaurant
  {
    name: "Kottu Roti Plate",
    price: 580,
    category: "Food and Restaurant",
    countInStock: 25,
    description: "Traditional Sri Lankan kottu roti with spices",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"]
  },
  {
    name: "Hoppers Combo",
    price: 420,
    category: "Food and Restaurant",
    countInStock: 20,
    description: "Egg hoppers with sambol and curry",
    images: ["https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300"]
  },
  {
    name: "Lamprais Package",
    price: 850,
    category: "Food and Restaurant",
    countInStock: 15,
    description: "Dutch-influenced rice packet with curry",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"]
  },
  {
    name: "Seafood Fried Rice",
    price: 720,
    category: "Food and Restaurant",
    countInStock: 18,
    description: "Fried rice with fresh seafood mix",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"]
  },
  {
    name: "String Hoppers Set",
    price: 450,
    category: "Food and Restaurant",
    countInStock: 22,
    description: "Traditional string hoppers with coconut milk",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"]
  },

  // Books and Stationery
  {
    name: "Academic Planner 2024",
    price: 1200,
    category: "Books and Stationery",
    countInStock: 35,
    description: "2024 academic planner with monthly layouts",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4d8553?w=300"]
  },
  {
    name: "Pen Set Premium",
    price: 890,
    category: "Books and Stationery",
    countInStock: 50,
    description: "Premium ballpoint pen set with case",
    images: ["https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300"]
  },
  {
    name: "Notebook Collection",
    price: 650,
    category: "Books and Stationery",
    countInStock: 60,
    description: "Set of 3 premium notebooks",
    images: ["https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300"]
  },
  {
    name: "Art Supplies Kit",
    price: 2500,
    category: "Books and Stationery",
    countInStock: 25,
    description: "Complete art supplies kit for beginners",
    images: ["https://images.unsplash.com/photo-1513364776144-9b21e69740d4?w=300"]
  },
  {
    name: "Dictionary English-Sinhala",
    price: 1850,
    category: "Books and Stationery",
    countInStock: 20,
    description: "Comprehensive English-Sinhala dictionary",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"]
  },

  // Home and Lifestyle
  {
    name: "Ceramic Vase Set",
    price: 2200,
    category: "Home and Lifestyle",
    countInStock: 18,
    description: "Handcrafted ceramic vase set",
    images: ["https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=300"]
  },
  {
    name: "Bamboo Basket",
    price: 1350,
    category: "Home and Lifestyle",
    countInStock: 30,
    description: "Eco-friendly bamboo storage basket",
    images: ["https://images.unsplash.com/photo-1535024932927-7dc68eee6f9d?w=300"]
  },
  {
    name: "Wall Art Canvas",
    price: 3800,
    category: "Home and Lifestyle",
    countInStock: 15,
    description: "Traditional Sri Lankan wall art",
    images: ["https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=300"]
  },
  {
    name: "Cushion Covers Set",
    price: 1680,
    category: "Home and Lifestyle",
    countInStock: 25,
    description: "Set of 4 decorative cushion covers",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"]
  },
  {
    name: "Table Lamp Modern",
    price: 4200,
    category: "Home and Lifestyle",
    countInStock: 12,
    description: "Modern LED table lamp with touch control",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"]
  },

  // Electronics
  {
    name: "Smartphone Android",
    price: 45000,
    category: "Electronics",
    countInStock: 20,
    description: "Latest Android smartphone with 5G",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"]
  },
  {
    name: "Laptop Backpack",
    price: 3200,
    category: "Electronics",
    countInStock: 35,
    description: "Water-resistant laptop backpack",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"]
  },
  {
    name: "USB Flash Drive 64GB",
    price: 1200,
    category: "Electronics",
    countInStock: 50,
    description: "High-speed USB 3.0 flash drive",
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300"]
  },
  {
    name: "Power Bank 20000mAh",
    price: 3800,
    category: "Electronics",
    countInStock: 30,
    description: "Fast charging power bank with LED display",
    images: ["https://images.unsplash.com/photo-1593642632821-c9b5e8ee1f32?w=300"]
  },
  {
    name: "Wireless Mouse",
    price: 1850,
    category: "Electronics",
    countInStock: 40,
    description: "Ergonomic wireless mouse with USB receiver",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300"]
  },

  // Clothing and Fashion
  {
    name: "Cotton Shirt Men",
    price: 2200,
    category: "Clothing and Fashion",
    countInStock: 45,
    description: "Premium cotton casual shirt for men",
    images: ["https://images.unsplash.com/photo-1594634319909-7e0b5d887c0b?w=300"]
  },
  {
    name: "Women's Dress",
    price: 3500,
    category: "Clothing and Fashion",
    countInStock: 30,
    description: "Elegant women's casual dress",
    images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300"]
  },
  {
    name: "Denim Jeans",
    price: 4200,
    category: "Clothing and Fashion",
    countInStock: 35,
    description: "Classic fit denim jeans",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=300"]
  },
  {
    name: "Sports Shoes",
    price: 5800,
    category: "Clothing and Fashion",
    countInStock: 25,
    description: "Comfortable running sports shoes",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300"]
  },
  {
    name: "Handbag Leather",
    price: 6500,
    category: "Clothing and Fashion",
    countInStock: 20,
    description: "Genuine leather handbag",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"]
  },

  // Sports and Outdoors
  {
    name: "Yoga Mat Premium",
    price: 2800,
    category: "Sports and Outdoors",
    countInStock: 30,
    description: "Non-slip premium yoga mat",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300"]
  },
  {
    name: "Dumbbells Set",
    price: 4500,
    category: "Sports and Outdoors",
    countInStock: 15,
    description: "Adjustable dumbbells set 5-25kg",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300"]
  },
  {
    name: "Tennis Racket",
    price: 6800,
    category: "Sports and Outdoors",
    countInStock: 12,
    description: "Professional tennis racket",
    images: ["https://images.unsplash.com/photo-1599435664321-d68ba7003619?w=300"]
  },
  {
    name: "Camping Tent",
    price: 8500,
    category: "Sports and Outdoors",
    countInStock: 10,
    description: "4-person waterproof camping tent",
    images: ["https://images.unsplash.com/photo-1504280390367-081b69dfe31d?w=300"]
  },
  {
    name: "Water Bottle Sports",
    price: 850,
    category: "Sports and Outdoors",
    countInStock: 50,
    description: "Insulated sports water bottle 1L",
    images: ["https://images.unsplash.com/photo-1602143407391-1fd1b5e7e689?w=300"]
  },

  // Beauty and Personal Care
  {
    name: "Face Wash Gel",
    price: 650,
    category: "Beauty and Personal Care",
    countInStock: 40,
    description: "Gentle face wash gel for all skin types",
    images: ["https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300"]
  },
  {
    name: "Moisturizer Cream",
    price: 1200,
    category: "Beauty and Personal Care",
    countInStock: 35,
    description: "Daily moisturizer with SPF 30",
    images: ["https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300"]
  },
  {
    name: "Shampoo Herbal",
    price: 780,
    category: "Beauty and Personal Care",
    countInStock: 45,
    description: "Herbal shampoo for hair growth",
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300"]
  },
  {
    name: "Lip Balm Set",
    price: 450,
    category: "Beauty and Personal Care",
    countInStock: 60,
    description: "Set of 3 flavored lip balms",
    images: ["https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300"]
  },
  {
    name: "Perfume Luxury",
    price: 3200,
    category: "Beauty and Personal Care",
    countInStock: 20,
    description: "Long-lasting luxury perfume",
    images: ["https://images.unsplash.com/photo-1528740591662-7b5c3e2a1f7c?w=300"]
  },

  // Toys and Games
  {
    name: "Building Blocks Set",
    price: 2200,
    category: "Toys and Games",
    countInStock: 25,
    description: "Creative building blocks for kids",
    images: ["https://images.unsplash.com/photo-1587121381325-3d0a4a2e6a18?w=300"]
  },
  {
    name: "Board Game Family",
    price: 3200,
    category: "Toys and Games",
    countInStock: 18,
    description: "Family board game collection",
    images: ["https://images.unsplash.com/photo-1587121381325-3d0a4a2e6a18?w=300"]
  },
  {
    name: "Puzzle 1000 Pieces",
    price: 1500,
    category: "Toys and Games",
    countInStock: 30,
    description: "Challenging 1000-piece jigsaw puzzle",
    images: ["https://images.unsplash.com/photo-1587121381325-3d0a4a2e6a18?w=300"]
  },
  {
    name: "Remote Control Car",
    price: 4500,
    category: "Toys and Games",
    countInStock: 15,
    description: "High-speed remote control car",
    images: ["https://images.unsplash.com/photo-1571887350254-9e8e7e7e8e8e?w=300"]
  },
  {
    name: "Art Kit Kids",
    price: 1800,
    category: "Toys and Games",
    countInStock: 35,
    description: "Complete art kit for children",
    images: ["https://images.unsplash.com/photo-1513364776144-9b21e69740d4?w=300"]
  },

  // Automotive
  {
    name: "Car Phone Holder",
    price: 850,
    category: "Automotive",
    countInStock: 40,
    description: "Universal car phone holder",
    images: ["https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300"]
  },
  {
    name: "Car Air Freshener",
    price: 280,
    category: "Automotive",
    countInStock: 80,
    description: "Long-lasting car air freshener",
    images: ["https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300"]
  },
  {
    name: "Car Cleaning Kit",
    price: 2200,
    category: "Automotive",
    countInStock: 25,
    description: "Complete car cleaning kit",
    images: ["https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300"]
  },
  {
    name: "Tire Pressure Gauge",
    price: 650,
    category: "Automotive",
    countInStock: 35,
    description: "Digital tire pressure gauge",
    images: ["https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300"]
  },
  {
    name: "Car Seat Covers",
    price: 3800,
    category: "Automotive",
    countInStock: 15,
    description: "Universal car seat covers set",
    images: ["https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300"]
  },

  // Health and Wellness
  {
    name: "Vitamin C Tablets",
    price: 850,
    category: "Health and Wellness",
    countInStock: 50,
    description: "High potency Vitamin C supplement",
    images: ["https://images.unsplash.com/photo-1574174627407-eb26732353a6?w=300"]
  },
  {
    name: "Yoga Blocks Set",
    price: 1200,
    category: "Health and Wellness",
    countInStock: 30,
    description: "EVA foam yoga blocks set",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300"]
  },
  {
    name: "Digital Thermometer",
    price: 650,
    category: "Health and Wellness",
    countInStock: 40,
    description: "Digital medical thermometer",
    images: ["https://images.unsplash.com/photo-1574174627407-eb26732353a6?w=300"]
  },
  {
    name: "Massage Ball Set",
    price: 980,
    category: "Health and Wellness",
    countInStock: 25,
    description: "Therapeutic massage ball set",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300"]
  },
  {
    name: "Essential Oils Kit",
    price: 2800,
    category: "Health and Wellness",
    countInStock: 20,
    description: "Aromatherapy essential oils collection",
    images: ["https://images.unsplash.com/photo-1574174627407-eb26732353a6?w=300"]
  }
];

const seedComprehensiveProducts = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert comprehensive sample products
    const insertedProducts = await Product.insertMany(comprehensiveSampleProducts);
    console.log(`✅ Successfully inserted ${insertedProducts.length} comprehensive sample products`);

    // Display category breakdown
    const categoryCount = {};
    insertedProducts.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });

    console.log('\n📊 Category Breakdown:');
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

    console.log('\n🎉 All sample products have been added successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the seeding function
seedComprehensiveProducts();
