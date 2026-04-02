const express = require("express");
const router  = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

router.get("/categories", getCategories);
router.get("/search", getProducts);
router.route("/")
  .get(getProducts)
  .post(createProduct);

router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;