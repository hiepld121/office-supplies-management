const OrderModel = require("../models/order.model");

const OrderService = {
    getAllOrders: async () => {
        return await OrderModel.getAllOrders();
    },

    getOrderById: async (id) => {
        return await OrderModel.getOrderById(id);
    },

    getOrdersByUserId: async (userId) => {
        return await OrderModel.getOrdersByUserId(userId);
    },

    updateOrderStatus: async (id, status) => {
        return await OrderModel.updateOrderStatus(id, status);
    },
};

module.exports = OrderService;