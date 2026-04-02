const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    featured,
    bestSeller,
    newArrival,
    page  = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (search && search.trim() !== "") {
    query.$text = { $search: search.trim() };
  }

  if (category && category !== "all") {
    query.category = category.toLowerCase().trim();
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (featured   === "true") query.featured   = true;
  if (bestSeller === "true") query.bestSeller = true;
  if (newArrival === "true") query.newArrival = true;

  let sortOption = { createdAt: -1 }; 
  switch (sort) {
    case "price_asc":   sortOption = { price: 1 };       break;
    case "price_desc":  sortOption = { price: -1 };      break;
    case "popular":     sortOption = { sold: -1 };       break;
    case "rating":      sortOption = { ratings: -1 };    break;
    case "newest":      sortOption = { createdAt: -1 };  break;
    case "oldest":      sortOption = { createdAt: 1 };   break;
    default: break;
  }

  const pageNum  = Math.max(Number(page), 1);
  const limitNum = Math.min(Number(limit), 50); 
  const skip     = (pageNum - 1) * limitNum;

  const total    = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum);

  res.json({
    success: true,
    products,
    total,
    page:       pageNum,
    totalPages: Math.ceil(total / limitNum),
    hasMore:    skip + products.length < total,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, product });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, message: "Product deleted" });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json({ success: true, categories });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};