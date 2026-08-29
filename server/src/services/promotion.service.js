const PromotionModel = require("../models/promotion.model");

const PromotionService = {
  getAllPromotions: async () => {
    return await PromotionModel.getAllPromotions();
  },

  getPromotionById: async (id) => {
    return await PromotionModel.getPromotionById(id);
  },

  createPromotion: async (promotionData) => {
    return await PromotionModel.createPromotion(promotionData);
  },

  updatePromotion: async (id, promotionData) => {
    return await PromotionModel.updatePromotion(id, promotionData);
  },

  deletePromotion: async (id) => {
    return await PromotionModel.deletePromotion(id);
  },
};

module.exports = PromotionService;