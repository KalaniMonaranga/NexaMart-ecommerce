const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name:    { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    images: [String],

    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true,
      trim: true,
      enum: ["grocery", "hampers", "food", "stationeries", "home", "fashion", "electronics", "beauty", "sports", "other"],
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },

    featured:   { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },

    tags: [String],

    reviews: [reviewSchema],
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text" });

productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    this.ratings =
      this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);