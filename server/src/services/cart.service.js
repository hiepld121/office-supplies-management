const CartModel = require("../models/cart.model");

const getCartByUserId = async (userId) => {
    return await CartModel.getCartByUserId(userId);
};

const addToCart = async (cartData) => {
    return await CartModel.addToCart(cartData);
};

const updateCartItem = async (id, userId, quantity) => {
    return await CartModel.updateCartItem(id, userId, quantity);
};

const deleteCartItem = async (id, userId) => {
    return await CartModel.deleteCartItem(id, userId);
};

const clearCart = async (userId) => {
    return await CartModel.clearCart(userId);
};

module.exports = {
    getCartByUserId,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
};