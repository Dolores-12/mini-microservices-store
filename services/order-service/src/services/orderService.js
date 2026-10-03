const Order = require("../models/Order");

const createOrder = async ({ userId, items }) => {
  const orderItems = items.map((item) => {
    const subtotal = item.price * item.quantity;

    return {
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal,
    };
  });

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    status: "PENDING",
  });

  return order;
};

const getUserOrders = async (userId) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

const getOrderById = async ({ orderId, userId }) => {
  return Order.findOne({
    _id: orderId,
    userId,
  });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
};