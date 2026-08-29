const CartService = require("../services/cart.service");

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await CartService.getCartByUserId(userId);

        return res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            product_id,
            quantity,
        } = req.body;

        const result = await CartService.addToCart({
            user_id: userId,
            product_id,
            quantity,
        });

        return res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;

        const result = await CartService.updateCartItem(
            id,
            userId,
            quantity
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const result = await CartService.deleteCartItem(
            id,
            userId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await CartService.clearCart(userId);

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
};