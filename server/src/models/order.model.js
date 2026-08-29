const db = require("../config/db");

const OrderModel = {
    getAllOrders: async () => {
        const [rows] = await db.execute(`
            SELECT
                o.id,
                o.user_id,
                u.name AS customer_name,
                o.status,
                o.created_at,
                o.updated_at
            FROM orders o
            INNER JOIN users u
                ON o.user_id = u.id
            WHERE o.deleted_at IS NULL
            ORDER BY o.created_at DESC
        `);

        return rows;
    },

    getOrderById: async (id) => {
        const [rows] = await db.execute(`
            SELECT
                o.id,
                o.user_id,
                u.name AS customer_name,
                o.status,
                o.created_at,
                o.updated_at
            FROM orders o
            INNER JOIN users u
                ON o.user_id = u.id
            WHERE o.id = ?
              AND o.deleted_at IS NULL
        `, [id]);

        return rows[0];
    },

    getOrdersByUserId: async (userId) => {
        const [rows] = await db.execute(`
            SELECT
                o.id,
                o.user_id,
                o.status,
                o.created_at,
                o.updated_at
            FROM orders o
            WHERE o.user_id = ?
              AND o.deleted_at IS NULL
            ORDER BY o.created_at DESC
        `, [userId]);

        return rows;
    },

    updateOrderStatus: async (id, status) => {
        const [result] = await db.execute(`
            UPDATE orders
            SET status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
              AND deleted_at IS NULL
        `, [status, id]);

        return result;
    },
};

module.exports = OrderModel;