const db = require("../config/db");

const getAllProducts = async () => {
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
        ORDER BY p.id DESC
    `;

    const [rows] = await db.execute(sql);

    return rows;
};

const getProductById = async (id) => {
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
        WHERE p.id = ?
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows[0];
};

const createProduct = async (productData) => {
    const { name, price, stock_quantity, sku, category_id, supplier_id } = productData;

    const sql = `
        INSERT INTO products (name, price, stock_quantity, sku, category_id, supplier_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [name, price, stock_quantity, sku, category_id, supplier_id]);

    return result;
};

const deleteProduct = async (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result;
};

const updateProduct = async (id, productData) => {
    const { name, price, stock_quantity, sku, category_id, supplier_id } = productData;

    const sql = `
        UPDATE products
        SET name = ?, price = ?, stock_quantity = ?, sku = ?, category_id = ?, supplier_id = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [name, price, stock_quantity, sku, category_id, supplier_id, id]);
    return result;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};