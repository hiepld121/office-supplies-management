const PromotionProductModel = require("../models/promotion_product.model");

const PromotionProductService = {
  getProductsByPromotionId: async (promotionId) => {
    return await PromotionProductModel.getProductsByPromotionId(
      promotionId
    );
  },

  addProductToPromotion: async (promotionId, productId) => {
    return await PromotionProductModel.addProductToPromotion(
      promotionId,
      productId
    );
  },

  removeProductFromPromotion: async (promotionId, productId) => {
    return await PromotionProductModel.removeProductFromPromotion(
      promotionId,
      productId
    );
  },
};

module.exports = PromotionProductService;