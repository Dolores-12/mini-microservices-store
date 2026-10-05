const express = require("express");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const validate = require("../middleware/validationMiddleware");

const {
  categorySchema,
  updateCategorySchema,
} = require("../utils/validationSchemas");

const router = express.Router();

router.post("/", validate(categorySchema), createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put(
  "/:id",
  validate(updateCategorySchema),
  updateCategory
);

router.delete("/:id", deleteCategory);

module.exports = router;