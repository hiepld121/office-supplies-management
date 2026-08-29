const OrderModel = require("../models/order.model");

const getAllOrders = async () => {
    return await OrderModel.getAllOrders();
};

const getOrderById = async (id) => {
    return await OrderModel.getOrderById(id);
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

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
};