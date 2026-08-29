const db = require("../config/db");

const PromotionProductModel = {
  getProductsByPromotionId: async (promotionId) => {
    const [rows] = await db.execute(
      `SELECT
        p.id,
        p.name,
        p.price,
        p.stock_quantity,
        p.sku
      FROM promotion_products pp
      INNER JOIN products p
        ON pp.product_id = p.id
      WHERE pp.promotion_id = ?
        AND p.deleted_at IS NULL`,
      [promotionId]
    );

    return rows;
  },

  addProductToPromotion: async (promotionId, productId) => {
    const [result] = await db.execute(
      `INSERT INTO promotion_products
        (promotion_id, product_id)
       VALUES (?, ?)`,
      [promotionId, productId]
    );

    return result;
  },

  removeProductFromPromotion: async (promotionId, productId) => {
    const [result] = await db.execute(
      `DELETE FROM promotion_products
       WHERE promotion_id = ?
         AND product_id = ?`,
      [promotionId, productId]
    );

    return result;
  },
};

module.exports = PromotionProductModel;