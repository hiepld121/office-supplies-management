const db = require("../config/db");

const getUserByEmail = async (email) => {
    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
};

const CUSTOMER_ROLE_ID = 2;
const createUser = async (userData) => {
   
    const { full_name, email, password, phone, address} = userData;

    const sql = `
        INSERT INTO users (full_name, email, password, phone, address, role_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [full_name, email, password, phone, address, CUSTOMER_ROLE_ID]);
    return result;
};

module.exports = {
    getUserByEmail,
    createUser
};
