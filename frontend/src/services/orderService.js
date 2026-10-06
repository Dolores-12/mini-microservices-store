import { apiRequest } from "./api";

async function createOrder(orderData) {
  return apiRequest("/api/orders/", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

async function getMyOrders() {
  return apiRequest("/api/orders/");
}

async function getOrder(id) {
  return apiRequest(`/api/orders/${id}`);
}

export {
  createOrder,
  getMyOrders,
  getOrder,
};