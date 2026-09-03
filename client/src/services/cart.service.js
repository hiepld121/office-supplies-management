import api from "./api";

const getCart = async () => {
    const response = await api.get("/cart");

    return response.data;
};

const addToCart = async (product_id, quantity) => {
    const response = await api.post("/cart", {
        product_id,
        quantity,
    });

    return response.data;
};

const updateCartItem = async (productId, quantity) => {
    const response = await api.put(
        `/cart/${productId}`,
        {
            quantity,
        }
    );

    return response.data;
};

const deleteCartItem = async (productId) => {
    const response = await api.delete(
        `/cart/${productId}`
    );

    return response.data;
};

const clearCart = async () => {
    const response = await api.delete("/cart");

    return response.data;
};

export default {
    getCart,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
};