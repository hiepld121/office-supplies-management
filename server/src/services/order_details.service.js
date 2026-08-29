const OrderDetailsModel = require("../models/order_details.model");

const getOrderDetailsByOrderId = async (orderId) => {
    return await OrderDetailsModel.getOrderDetailsByOrderId(orderId);
};

const getOrderDetailById = async (id) => {
    return await OrderDetailsModel.getOrderDetailById(id);
};

const createOrderDetail = async (orderDetailData) => {
    return await OrderDetailsModel.createOrderDetail(orderDetailData);
};

const deleteOrderDetail = async (id) => {
    return await OrderDetailsModel.deleteOrderDetail(id);
};

module.exports = {
    getOrderDetailsByOrderId,
    getOrderDetailById,
    createOrderDetail,
    deleteOrderDetail,
};