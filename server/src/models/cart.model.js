const db = require("../config/db");

const getCartByUserId = async (userId, connection = db) => {
    const [rows] = await connection.execute(
        `SELECT
            ci.id,
            ci.user_id,
            ci.product_id,
            p.name AS product_name,

            -- Giá gốc
            p.price AS original_price,

            -- Giữ price để không phá code hiện tại
            p.price,

            p.stock_quantity,
            ci.quantity,

            -- Promotion đang active có discount cao nhất
            COALESCE(MAX(pr.discount_percent), 0) AS discount_percent,

            -- Giá sau giảm
            ROUND(
                p.price * (
                    100 - COALESCE(MAX(pr.discount_percent), 0)
                ) / 100
            ) AS discounted_price,

            -- Subtotal giá gốc
            (
                p.price * ci.quantity
            ) AS subtotal,

            -- Subtotal sau giảm
            ROUND(
                p.price * (
                    100 - COALESCE(MAX(pr.discount_percent), 0)
                ) / 100
            ) * ci.quantity AS discounted_subtotal

         FROM cart_items ci

         INNER JOIN products p
            ON ci.product_id = p.id

         LEFT JOIN promotion_products pp
            ON p.id = pp.product_id

         LEFT JOIN promotions pr
            ON pp.promotion_id = pr.id
            AND pr.status = 'active'
            AND CURDATE() BETWEEN pr.start_date AND pr.end_date
            AND pr.deleted_at IS NULL

         WHERE ci.user_id = ?

         GROUP BY
            ci.id,
            ci.user_id,
            ci.product_id,
            p.name,
            p.price,
            p.stock_quantity,
            ci.quantity

         ORDER BY ci.id DESC`,
        [userId]
    );

    return rows;
};

const getCartItem = async (userId, productId) => {
    const [rows] = await db.execute(
        `SELECT *
         FROM cart_items
         WHERE user_id = ?
           AND product_id = ?`,
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

    const existingItem = await getCartItem(
        user_id,
        product_id
    );

    if (existingItem) {
        const [result] = await db.execute(
            `UPDATE cart_items
             SET quantity = quantity + ?
             WHERE user_id = ?
               AND product_id = ?`,
            [
                quantity,
                user_id,
                product_id
            ]
        );

        return result;
    }

    const [result] = await db.execute(
        `INSERT INTO cart_items
        (user_id, product_id, quantity)
        VALUES (?, ?, ?)`,
        [
            user_id,
            product_id,
            quantity
        ]
    );

    return result;
};

const updateCartItem = async (
    userId,
    productId,
    quantity
) => {
    const [result] = await db.execute(
        `UPDATE cart_items
         SET quantity = ?
         WHERE user_id = ?
           AND product_id = ?`,
        [
            quantity,
            userId,
            productId
        ]
    );

    return result;
};

const deleteCartItem = async (
    userId,
    productId
) => {
    const [result] = await db.execute(
        `DELETE FROM cart_items
         WHERE user_id = ?
           AND product_id = ?`,
        [
            userId,
            productId
        ]
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