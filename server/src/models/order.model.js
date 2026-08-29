const db = require("../config/db");

const getAllOrders = async () => {
    const [rows] = await db.execute(
        `SELECT 
            id,
            user_id,
            total_amount,
            shipping_address,
            payment_method,
            status,
            created_at,
            updated_at
         FROM orders
         ORDER BY created_at DESC`
    );

    return rows;
};

const getOrderById = async (id) => {
    const [rows] = await db.execute(
        `SELECT 
            id,
            user_id,
            total_amount,
            shipping_address,
            payment_method,
            status,
            created_at,
            updated_at
         FROM orders
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const createOrder = async (orderData) => {
    const {
        user_id,
        total_amount,
        shipping_address,
        payment_method,
        status,
    } = orderData;

    const [result] = await db.execute(
        `INSERT INTO orders
        (user_id, total_amount, shipping_address, payment_method, status)
        VALUES (?, ?, ?, ?, ?)`,
        [
            user_id,
            total_amount,
            shipping_address,
            payment_method,
            status || "pending",
        ]
    );

    return result;
};

const updateOrderStatus = async (id, status) => {
    const [result] = await db.execute(
        `UPDATE orders
         SET status = ?
         WHERE id = ?`,
        [status, id]
    );

    return result;
};

const deleteOrder = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM orders
         WHERE id = ?`,
        [id]
    );

    return result;
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
};