const express = require("express");

const router = express.Router();

const PromotionController = require("../controllers/promotion.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

router.get(
  "/",
  PromotionController.getAllPromotions
);

router.get(
  "/:id",
  PromotionController.getPromotionById
);

router.post(
  "/",
  authenticateToken,
  authorizeRole(1),
  PromotionController.createPromotion
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRole(1),
  PromotionController.updatePromotion
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(1),
  PromotionController.deletePromotion
);

module.exports = router;