const express = require("express");

const router = express.Router();

const PromotionProductController = require("../controllers/promotion_product.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");
const {
    validateAddProductToPromotion,
} = require("../middleware/promotion_product.validation.middleware");

router.get(
  "/:promotionId/products",
  PromotionProductController.getProductsByPromotionId
);

router.post(
  "/:promotionId/products",
  authenticateToken,
  authorizeRole(1),
  validateAddProductToPromotion,
  PromotionProductController.addProductToPromotion
);

router.delete(
  "/:promotionId/products/:productId",
  authenticateToken,
  authorizeRole(1),
  validateAddProductToPromotion,
  PromotionProductController.removeProductFromPromotion
);

module.exports = router;