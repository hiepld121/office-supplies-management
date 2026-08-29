const PromotionProductService = require("../services/promotion_product.service");

const getProductsByPromotionId = async (req, res) => {
  try {
    const { promotionId } = req.params;

    const products =
      await PromotionProductService.getProductsByPromotionId(
        promotionId
      );

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addProductToPromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const { product_id } = req.body;

    const result =
      await PromotionProductService.addProductToPromotion(
        promotionId,
        product_id
      );

    return res.status(201).json({
      success: true,
      message: "Product added to promotion successfully",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Product is already in this promotion",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({
        success: false,
        message: "Promotion or product not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeProductFromPromotion = async (req, res) => {
  try {
    const { promotionId, productId } = req.params;

    const result =
      await PromotionProductService.removeProductFromPromotion(
        promotionId,
        productId
      );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product is not in this promotion",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from promotion successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProductsByPromotionId,
  addProductToPromotion,
  removeProductFromPromotion,
};