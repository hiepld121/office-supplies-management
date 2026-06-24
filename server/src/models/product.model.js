const db = require("../config/db");

const getAllProducts = (callback) => {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.price,
            p.stock_quantity,
            p.sku,
            c.name AS category_name,
            s.name AS supplier_name
        FROM products p
        INNER JOIN categories c
            ON p.category_id = c.id
        INNER JOIN suppliers s
            ON p.supplier_id = s.id
    `;

    db.query(sql, callback);
};

module.exports = {
    getAllProducts
};