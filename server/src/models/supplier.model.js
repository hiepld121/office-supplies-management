const db = require("../config/db");

const getAllSuppliers = async () => {
    const sql = `
        SELECT
            id,
            name,
            phone,
            email,
            address,
            status,
            created_at,
            updated_at
        FROM suppliers
        WHERE deleted_at IS NULL
        ORDER BY id DESC
    `;

    const [rows] = await db.execute(sql);

    return rows;
};

const getSupplierById = async (id) => {
    const sql = `
        SELECT
            id,
            name,
            phone,
            email,
            address,
            status,
            created_at,
            updated_at
        FROM suppliers
        WHERE id = ?
          AND deleted_at IS NULL
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows[0];
};

const createSupplier = async (supplierData) => {
    const {
        name,
        phone,
        email,
        address
    } = supplierData;

    const sql = `
        INSERT INTO suppliers
            (name, phone, email, address)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
        name,
        phone,
        email,
        address
    ]);

    return result;
};

const updateSupplier = async (id, supplierData) => {
    const {
        name,
        phone,
        email,
        address,
        status
    } = supplierData;

    const sql = `
        UPDATE suppliers
        SET
            name = ?,
            phone = ?,
            email = ?,
            address = ?,
            status = ?
        WHERE id = ?
          AND deleted_at IS NULL
    `;

    const [result] = await db.execute(sql, [
        name,
        phone,
        email,
        address,
        status,
        id
    ]);

    return result;
};

const deleteSupplier = async (id) => {
    const sql = `
        UPDATE suppliers
        SET
            status = 'inactive',
            deleted_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND deleted_at IS NULL
    `;

    const [result] = await db.execute(sql, [id]);

    return result;
};

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};

