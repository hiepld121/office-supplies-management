const express = require("express");

const router = express.Router();

const OrderDetailsController = require("../controllers/order_details.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

// Get all details of an order
router.get(
    "/order/:orderId",
    authenticateToken,
    OrderDetailsController.getOrderDetailsByOrderId
);

// Get order detail by ID
router.get(
    "/:id",
    authenticateToken,
    OrderDetailsController.getOrderDetailById
);

// Create order detail - Admin
router.post(
    "/",
    authenticateToken,
    authorizeRole(1),
    OrderDetailsController.createOrderDetail
);

// Delete order detail - Admin
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    OrderDetailsController.deleteOrderDetail
);

module.exports = router;