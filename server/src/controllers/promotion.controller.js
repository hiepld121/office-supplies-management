const PromotionService = require("../services/promotion.service");

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await PromotionService.getAllPromotions();

    return res.status(200).json({
      success: true,
      data: promotions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;

    const promotion = await PromotionService.getPromotionById(id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: promotion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPromotion = async (req, res) => {
  try {
    const promotionData = req.body;

    const result = await PromotionService.createPromotion(promotionData);

    return res.status(201).json({
      success: true,
      message: "Promotion created successfully",
      promotionId: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotionData = req.body;

    const result = await PromotionService.updatePromotion(
      id,
      promotionData
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Promotion updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await PromotionService.deletePromotion(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Promotion deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
};