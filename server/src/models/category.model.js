const db = require("../config/db");

const getAllCategories = async () => {
  const sql = `
        SELECT
            id,
            name
        FROM categories
        ORDER BY id DESC
    `;

  const [rows] = await db.execute(sql);

  return rows;
};

const getCategoryById = async (id) => {
  const sql = "SELECT id, name FROM categories WHERE id = ?";

  const [rows] = await db.execute(sql, [id]);

  return rows[0];
};

const createCategory = async (categoryData) => {
  const { name } = categoryData;

  const sql = "INSERT INTO categories (name) VALUES (?)";
  const [result] = await db.execute(sql, [name]);

  return result;
};

const updateCategory = async (id, categoryData) => {
  const { name } = categoryData;

  const sql = "UPDATE categories SET name = ? WHERE id = ?";
  const [result] = await db.execute(sql, [name, id]);

  return result;
};

const deleteCategory = async (id) => {
  const sql = "DELETE FROM categories WHERE id = ?";
  const [result] = await db.execute(sql, [id]);

  return result;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
