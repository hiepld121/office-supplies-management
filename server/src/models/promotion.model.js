const db = require("../config/db");

const PromotionModel = {
  getAllPromotions: async () => {
    const [rows] = await db.execute(
      `SELECT 
        id,
        name,
        description,
        discount_percent,
        start_date,
        end_date,
        status,
        created_at,
        updated_at
      FROM promotions
      WHERE deleted_at IS NULL
      ORDER BY id DESC`
    );

    return rows;
  },

  getPromotionById: async (id) => {
    const [rows] = await db.execute(
      `SELECT 
        id,
        name,
        description,
        discount_percent,
        start_date,
        end_date,
        status,
        created_at,
        updated_at
      FROM promotions
      WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );

    return rows[0];
  },

  createPromotion: async (promotionData) => {
    const {
      name,
      description,
      discount_percent,
      start_date,
      end_date,
      status,
    } = promotionData;

    const [result] = await db.execute(
      `INSERT INTO promotions
        (name, description, discount_percent, start_date, end_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        discount_percent,
        start_date,
        end_date,
        status || "active",
      ]
    );

    return result;
  },

  updatePromotion: async (id, promotionData) => {
    const {
      name,
      description,
      discount_percent,
      start_date,
      end_date,
      status,
    } = promotionData;

    const [result] = await db.execute(
      `UPDATE promotions
       SET
         name = ?,
         description = ?,
         discount_percent = ?,
         start_date = ?,
         end_date = ?,
         status = ?
       WHERE id = ? AND deleted_at IS NULL`,
      [
        name,
        description,
        discount_percent,
        start_date,
        end_date,
        status,
        id,
      ]
    );

    return result;
  },

  deletePromotion: async (id) => {
    const [result] = await db.execute(
      `UPDATE promotions
       SET deleted_at = CURRENT_TIMESTAMP,
           status = 'inactive'
       WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );

    return result;
  },
};

module.exports = PromotionModel;