const db = require("../config/db");
const CartModel = require("../models/cart.model");
const OrderModel = require("../models/order.model");

const getAllOrders = async () => {
  return await OrderModel.getAllOrders();
};

const getOrderById = async (id) => {
  return await OrderModel.getOrderById(id);
};

const getOrdersByUserId = async (userId) => {
  return await OrderModel.getOrdersByUserId(userId);
};

const createOrder = async (orderData) => {
  return await OrderModel.createOrder(orderData);
};

const updateOrderStatus = async (id, status) => {
  return await OrderModel.updateOrderStatus(id, status);
};

const deleteOrder = async (id) => {
  return await OrderModel.deleteOrder(id);
};

const checkout = async (orderData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const cartItems = await CartModel.getCartByUserId(
      orderData.user_id,
      connection
    );

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Check stock
    for (const item of cartItems) {
      if (item.quantity > item.stock_quantity) {
        throw new Error(
          `Insufficient stock for product: ${item.product_name}`
        );
      }
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * Number(item.quantity),
      0
    );

    const orderId = await OrderModel.createOrderWithDetails(
      connection,
      {
        ...orderData,
        total_amount: totalAmount,
      },
      cartItems
    );

    await connection.commit();

    return {
      orderId,
      totalAmount,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  checkout,
};