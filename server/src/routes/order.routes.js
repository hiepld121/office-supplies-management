const express = require("express");

const router = express.Router();

const OrderController = require("../controllers/order.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

// Get all orders
router.get(
    "/",
    authenticateToken,
    authorizeRole(1),
    OrderController.getAllOrders
);

// Get order by ID
router.get(
    "/:id",
    authenticateToken,
    OrderController.getOrderById
);

// Create order
router.post(
    "/",
    authenticateToken,
    OrderController.createOrder
);

// Update order status - Admin
router.put(
    "/:id/status",
    authenticateToken,
    authorizeRole(1),
    OrderController.updateOrderStatus
);

// Delete order - Admin
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    OrderController.deleteOrder
);

module.exports = router;