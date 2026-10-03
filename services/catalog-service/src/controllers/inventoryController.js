const Product = require("../models/Product");

const reserveStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required"
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "quantity must be a positive integer"
      });
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: quantity }
      },
      {
        $inc: { stock: -quantity }
      },
      {
        new: true
      }
    );

    if (!product) {
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      return res.status(409).json({
        success: false,
        message: "Insufficient stock",
        availableStock: existingProduct.stock
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock reserved successfully",
      productId: product._id,
      reservedQuantity: quantity,
      remainingStock: product.stock
    });
  } catch (error) {
    console.error("Reserve stock error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reserve stock",
      error: error.message
    });
  }
};

const releaseStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required"
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "quantity must be a positive integer"
      });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { stock: quantity }
      },
      {
        new: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock released successfully",
      productId: product._id,
      releasedQuantity: quantity,
      currentStock: product.stock
    });
  } catch (error) {
    console.error("Release stock error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to release stock",
      error: error.message
    });
  }
};

module.exports = {
  reserveStock,
  releaseStock
};