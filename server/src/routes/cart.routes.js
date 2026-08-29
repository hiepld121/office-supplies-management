const express = require("express");

const router = express.Router();

const CartController = require("../controllers/cart.controller");

const { authenticateToken } = require("../middleware/auth.middleware");

router.get(
    "/",
    authenticateToken,
    CartController.getCart
);

router.post(
    "/",
    authenticateToken,
    CartController.addToCart
);

router.put(
    "/:id",
    authenticateToken,
    CartController.updateCartItem
);

router.delete(
    "/:id",
    authenticateToken,
    CartController.deleteCartItem
);

router.delete(
    "/",
    authenticateToken,
    CartController.clearCart
);

module.exports = router;