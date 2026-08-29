const OrderDetailsService = require("../services/order_details.service");

const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const orderDetails =
            await OrderDetailsService.getOrderDetailsByOrderId(orderId);

        return res.status(200).json({
            success: true,
            data: orderDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const orderDetail =
            await OrderDetailsService.getOrderDetailById(id);

        if (!orderDetail) {
            return res.status(404).json({
                success: false,
                message: "Order detail not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: orderDetail,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createOrderDetail = async (req, res) => {
    try {
        const orderDetailData = req.body;

        const result =
            await OrderDetailsService.createOrderDetail(orderDetailData);

        return res.status(201).json({
            success: true,
            message: "Order detail created successfully",
            orderDetailId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const result =
            await OrderDetailsService.deleteOrderDetail(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Order detail not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order detail deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getOrderDetailsByOrderId,
    getOrderDetailById,
    createOrderDetail,
    deleteOrderDetail,
};