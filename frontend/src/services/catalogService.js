import { apiRequest } from "./api";

// =========================
// Products
// =========================

async function getProducts(query = "") {
  const endpoint = query
    ? `/api/catalog/products?${query}`
    : "/api/catalog/products";

  return apiRequest(endpoint);
}

async function getProduct(id) {
  return apiRequest(`/api/catalog/products/${id}`);
}

async function createProduct(formData) {
  return apiRequest("/api/catalog/products", {
    method: "POST",
    body: formData,
  });
}

async function updateProduct(id, formData) {
  return apiRequest(`/api/catalog/products/${id}`, {
    method: "PUT",
    body: formData,
  });
}

async function deleteProduct(id) {
  return apiRequest(`/api/catalog/products/${id}`, {
    method: "DELETE",
  });
}

// =========================
// Categories
// =========================

async function getCategories() {
  return apiRequest("/api/catalog/categories");
}

async function getCategory(id) {
  return apiRequest(`/api/catalog/categories/${id}`);
}

async function createCategory(categoryData) {
  return apiRequest("/api/catalog/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  });
}

async function updateCategory(id, categoryData) {
  return apiRequest(`/api/catalog/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(categoryData),
  });
}

async function deleteCategory(id) {
  return apiRequest(`/api/catalog/categories/${id}`, {
    method: "DELETE",
  });
}

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};