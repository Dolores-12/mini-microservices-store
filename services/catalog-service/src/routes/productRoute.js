const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validate = require("../middleware/validationMiddleware");

const {
  productSchema,
  updateProductSchema,
} = require("../utils/validationSchemas");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  upload.array("images", 10),
  validate(productSchema),
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put(
  "/:id",
  upload.array("images", 10),
  validate(updateProductSchema),
  updateProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;