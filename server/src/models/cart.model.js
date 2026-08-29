const db = require("../config/db");

const getCartByUserId = async (userId, connection = db) => {
    const [rows] = await connection.execute(
        `SELECT
            ci.id,
            ci.user_id,
            ci.product_id,
            p.name AS product_name,
            p.price,
            p.stock_quantity,
            ci.quantity,
            (p.price * ci.quantity) AS subtotal
         FROM cart_items ci
         INNER JOIN products p ON ci.product_id = p.id
         WHERE ci.user_id = ?
         ORDER BY ci.id DESC`,
        [userId]
    );

    return rows;
};

const getCartItem = async (userId, productId) => {
    const [rows] = await db.execute(
        `SELECT *
         FROM cart_items
         WHERE user_id = ? AND product_id = ?`,
        [userId, productId]
    );

    return rows[0];
};

const addToCart = async (cartData) => {
    const {
        user_id,
        product_id,
        quantity,
    } = cartData;

    const existingItem = await getCartItem(user_id, product_id);

    if (existingItem) {
        const [result] = await db.execute(
            `UPDATE cart_items
             SET quantity = quantity + ?
             WHERE user_id = ? AND product_id = ?`,
            [quantity, user_id, product_id]
        );

        return result;
    }

    const [result] = await db.execute(
        `INSERT INTO cart_items
        (user_id, product_id, quantity)
        VALUES (?, ?, ?)`,
        [user_id, product_id, quantity]
    );

    return result;
};

const updateCartItem = async (id, userId, quantity) => {
    const [result] = await db.execute(
        `UPDATE cart_items
         SET quantity = ?
         WHERE id = ? AND user_id = ?`,
        [quantity, id, userId]
    );

    return result;
};

const deleteCartItem = async (id, userId) => {
    const [result] = await db.execute(
        `DELETE FROM cart_items
         WHERE id = ? AND user_id = ?`,
        [id, userId]
    );

    return result;
};

const clearCart = async (userId) => {
    const [result] = await db.execute(
        `DELETE FROM cart_items
         WHERE user_id = ?`,
        [userId]
    );

    return result;
};

module.exports = {
    getCartByUserId,
    getCartItem,
    addToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
};