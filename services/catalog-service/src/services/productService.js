const Product = require("../models/Product");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getAllProducts = async ({
  search,
  category,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
}) => {
  const filter = {
    isActive: true,
  };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getProductById = async (id) => {
  return await Product.findOne({
    _id: id,
    isActive: true,
  }).populate("category");
};

const updateProduct = async (id, updateData) => {
  return await Product.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).populate("category");
};

const deleteProduct = async (id) => {
  return await Product.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      new: true,
    }
  );
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};