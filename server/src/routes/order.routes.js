const express = require("express");

const router = express.Router();

const OrderController = require("../controllers/order.controller");

const { authenticateToken } = require("../middleware/auth.middleware");

const { authorizeRole } = require("../middleware/role.middleware");

// Get all orders - Admin
router.get(
    "/",
    authenticateToken,
    authorizeRole(1),
    OrderController.getAllOrders
);

// Get my orders - Customer
router.get(
    "/my-orders",
    authenticateToken,
    OrderController.getMyOrders
);

// Checkout - Customer
router.post(
    "/checkout",
    authenticateToken,
    OrderController.checkout
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