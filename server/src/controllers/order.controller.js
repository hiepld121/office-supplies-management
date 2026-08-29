const OrderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();

        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrderService.getOrderById(id);

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
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        const result = await OrderService.createOrder(orderData);

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await OrderService.updateOrderStatus(id, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await OrderService.deleteOrder(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            shipping_address,
            payment_method,
        } = req.body;

        if (!shipping_address) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required",
            });
        }

        if (!payment_method) {
            return res.status(400).json({
                success: false,
                message: "Payment method is required",
            });
        }

        const result = await OrderService.checkout({
            user_id: userId,
            shipping_address,
            payment_method,
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    checkout,
};
    