const db = require("../config/db");

const PromotionModel = {
  // =========================================
  // GET ALL PROMOTIONS
  // =========================================
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

  // =========================================
  // GET PROMOTION BY ID
  // =========================================
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
      WHERE id = ? 
        AND deleted_at IS NULL`,
      [id]
    );

    return rows[0];
  },

  // =========================================
  // CREATE PROMOTION
  // =========================================
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
        (
          name,
          description,
          discount_percent,
          start_date,
          end_date,
          status
        )
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

  // =========================================
  // UPDATE PROMOTION
  // =========================================
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
       WHERE id = ?
         AND deleted_at IS NULL`,
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

  // =========================================
  // DELETE PROMOTION
  // =========================================
  deletePromotion: async (id) => {
    const [result] = await db.execute(
      `UPDATE promotions
       SET
         deleted_at = CURRENT_TIMESTAMP,
         status = 'inactive'
       WHERE id = ?
         AND deleted_at IS NULL`,
      [id]
    );

    return result;
  },

  // =========================================
  // GET ONE ACTIVE PROMOTION BY PRODUCT
  // =========================================
  getActivePromotionByProductId: async (productId) => {
    const [rows] = await db.execute(
      `SELECT
        p.id,
        p.name,
        p.discount_percent,
        p.start_date,
        p.end_date
       FROM promotion_products pp
       INNER JOIN promotions p
          ON pp.promotion_id = p.id
       WHERE pp.product_id = ?
         AND p.status = 'active'
         AND CURDATE() BETWEEN p.start_date AND p.end_date
         AND p.deleted_at IS NULL
       ORDER BY p.discount_percent DESC
       LIMIT 1`,
      [productId]
    );

    return rows[0] || null;
  },

  // =========================================
  // GET ACTIVE PROMOTIONS FOR MULTIPLE PRODUCTS
  // =========================================
  getActivePromotionsByProductIds: async (
    connection,
    productIds
  ) => {
    if (!productIds || productIds.length === 0) {
      return [];
    }

    const placeholders = productIds
      .map(() => "?")
      .join(",");

    const [rows] = await connection.execute(
      `SELECT
        pp.product_id,
        p.id AS promotion_id,
        p.name AS promotion_name,
        p.discount_percent,
        p.start_date,
        p.end_date
       FROM promotion_products pp
       INNER JOIN promotions p
          ON pp.promotion_id = p.id
       WHERE pp.product_id IN (${placeholders})
         AND p.status = 'active'
         AND CURDATE() BETWEEN p.start_date AND p.end_date
         AND p.deleted_at IS NULL
       ORDER BY
         pp.product_id,
         p.discount_percent DESC`,
      productIds
    );

    return rows;
  },
};

module.exports = PromotionModel;