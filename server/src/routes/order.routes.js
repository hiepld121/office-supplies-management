const express = require("express");

const router = express.Router();

const OrderController = require("../controllers/order.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

// Customer
router.get(
    "/my-orders",
    authenticateToken,
    OrderController.getMyOrders
);

// Admin
router.get(
    "/",
    authenticateToken,
    authorizeRole(1),
    OrderController.getAllOrders
);

router.get(
    "/:id",
    authenticateToken,
    OrderController.getOrderById
);

router.put(
    "/:id/status",
    authenticateToken,
    authorizeRole(1),
    OrderController.updateOrderStatus
);

module.exports = router;