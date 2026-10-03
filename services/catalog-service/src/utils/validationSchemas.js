const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .min(5)
    .max(1000)
    .required(),

  price: Joi.number()
    .min(0)
    .required(),

  stock: Joi.number()
    .integer()
    .min(0)
    .required(),

  category: Joi.string()
    .hex()
    .length(24)
    .required(),

  isActive: Joi.boolean(),
});

const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100),

  description: Joi.string()
    .trim()
    .min(5)
    .max(1000),

  price: Joi.number()
    .min(0),

  stock: Joi.number()
    .integer()
    .min(0),

  category: Joi.string()
    .hex()
    .length(24),

  isActive: Joi.boolean(),
}).min(1);

const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().max(500).allow("").default(""),

  isActive: Joi.boolean(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  description: Joi.string().trim().max(500).allow(""),

  isActive: Joi.boolean(),
}).min(1);

module.exports = {
  productSchema,
  updateProductSchema,
  categorySchema,
  updateCategorySchema,
};