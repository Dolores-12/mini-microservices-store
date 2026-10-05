const Category = require("../models/Category");

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const getAllCategories = async () => {
  return await Category.find({
    isActive: true,
  }).sort({ name: 1 });
};

const getCategoryById = async (id) => {
  return await Category.findOne({
    _id: id,
    isActive: true,
  });
};

const updateCategory = async (id, updateData) => {
  return await Category.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCategory = async (id) => {
  return await Category.findOneAndUpdate(
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
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};