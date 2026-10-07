const express = require("express");

const {
  create,
  getMyOrders,
  getOne,
} = require("../controllers/orderController");

const authenticate = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
  createOrderSchema,
} = require("../utils/validationSchemas");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(createOrderSchema),
  create
);

router.get(
  "/",
  authenticate,
  getMyOrders
);

router.get(
  "/:id",
  authenticate,
  getOne
);

module.exports = router;