const db = require("../config/db");

const getOrderDetailsByOrderId = async (orderId) => {
    const [rows] = await db.execute(
        `SELECT
            od.id,
            od.order_id,
            od.product_id,
            p.name AS product_name,
            od.quantity,
            od.price
         FROM order_details od
         INNER JOIN products p ON od.product_id = p.id
         WHERE od.order_id = ?
         ORDER BY od.id ASC`,
        [orderId]
    );

    return rows;
};

const getOrderDetailById = async (id) => {
    const [rows] = await db.execute(
        `SELECT
            od.id,
            od.order_id,
            od.product_id,
            p.name AS product_name,
            od.quantity,
            od.price
         FROM order_details od
         INNER JOIN products p ON od.product_id = p.id
         WHERE od.id = ?`,
        [id]
    );

    return rows[0];
};

const createOrderDetail = async (orderDetailData) => {
    const {
        order_id,
        product_id,
        quantity,
        price,
    } = orderDetailData;

    const [result] = await db.execute(
        `INSERT INTO order_details
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)`,
        [
            order_id,
            product_id,
            quantity,
            price,
        ]
    );

    return result;
};

const deleteOrderDetail = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM order_details
         WHERE id = ?`,
        [id]
    );

    return result;
};

module.exports = {
    getOrderDetailsByOrderId,
    getOrderDetailById,
    createOrderDetail,
    deleteOrderDetail,
};