const express = require("express");

const {
  reserveStock,
  releaseStock
} = require("../controllers/inventoryController");

const verifyInternalService = require("../utils/internalAuth");

const router = express.Router();

router.post(
  "/reserve",
  verifyInternalService,
  reserveStock
);

router.post(
  "/release",
  verifyInternalService,
  releaseStock
);

module.exports = router;