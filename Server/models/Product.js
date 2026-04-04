const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    information: { type: String }, 
    images: [{ type: String, required: true }], 
    price: { type: String, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;