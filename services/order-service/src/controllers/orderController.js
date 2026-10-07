const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../services/orderService");

const create = async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await createOrder({
      userId,
      items: req.body.items,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await getUserOrders(userId);

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await getOrderById({
      orderId: req.params.id,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
    });
  }
};

module.exports = {
  create,
  getMyOrders,
  getOne,
};