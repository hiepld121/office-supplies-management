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
    // Get order
    const [orderRows] = await db.execute(
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

    if (orderRows.length === 0) {
        return null;
    }

    const order = orderRows[0];

    // Get order items
    const [itemRows] = await db.execute(
        `SELECT
            od.id,
            od.order_id,
            od.product_id,
            p.name AS product_name,
            od.quantity,
            od.price
         FROM order_details od
         INNER JOIN products p
             ON od.product_id = p.id
         WHERE od.order_id = ?`,
        [id]
    );

    return {
        ...order,
        items: itemRows,
    };
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

const createOrderWithDetails = async (
    connection,
    orderData,
    cartItems
) => {
    const {
        user_id,
        total_amount,
        shipping_address,
        payment_method,
    } = orderData;

    // Create order
    const [orderResult] = await connection.execute(
        `INSERT INTO orders
        (user_id, total_amount, shipping_address, payment_method, status)
        VALUES (?, ?, ?, ?, ?)`,
        [
            user_id,
            total_amount,
            shipping_address,
            payment_method,
            "pending",
        ]
    );

    const orderId = orderResult.insertId;

    // Create order details
    for (const item of cartItems) {
        await connection.execute(
            `INSERT INTO order_details
            (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)`,
            [
                orderId,
                item.product_id,
                item.quantity,
                item.price,
            ]
        );

        // Decrease product stock
        await connection.execute(
            `UPDATE products
             SET stock_quantity = stock_quantity - ?
             WHERE id = ?`,
            [
                item.quantity,
                item.product_id,
            ]
        );
    }

    // Clear cart
    await connection.execute(
        `DELETE FROM cart_items
         WHERE user_id = ?`,
        [user_id]
    );

    return orderId;
};

const getOrdersByUserId = async (userId) => {
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
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
};



module.exports = {
    getAllOrders,
    getOrderById,
    getOrdersByUserId,   
    createOrder,
    createOrderWithDetails,
    updateOrderStatus,
    deleteOrder,
};