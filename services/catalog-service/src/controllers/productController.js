const productService = require("../services/productService");

const cloudinaryService = require("../services/cloudinaryService");

const createProduct = async (req, res) => {
  try {
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const image = await cloudinaryService.uploadImage(
          file.buffer
        );

        uploadedImages.push(image);
      }
    }

    const product = await productService.createProduct({
      ...req.body,
      images: uploadedImages,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const existingProduct = await productService.getProductById(
      req.params.id
    );

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    /*
     * Only replace images when new images were uploaded.
     * If no new images are supplied, existing images remain unchanged.
     */
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];

      for (const file of req.files) {
        const image = await cloudinaryService.uploadImage(
          file.buffer
        );

        uploadedImages.push(image);
      }

      /*
       * Upload the new images first.
       * If successful, remove the old images from Cloudinary.
       */
      for (const image of existingProduct.images) {
        await cloudinaryService.deleteImage(image.publicId);
      }

      updateData.images = uploadedImages;
    }

    const product = await productService.updateProduct(
      req.params.id,
      updateData
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        await cloudinaryService.deleteImage(image.publicId);
      }
    }

    const deletedProduct = await productService.deleteProduct(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};