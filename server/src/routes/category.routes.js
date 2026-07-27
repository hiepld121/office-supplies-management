const express = require("express");

const router = express.Router();

const CategoryController = require("../controllers/category.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

// Public Routes
router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getCategoryById);

// Admin Routes
router.post(
    "/",
    authenticateToken,
    authorizeRole(1),
    CategoryController.createCategory
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    CategoryController.updateCategory
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    CategoryController.deleteCategory
);

module.exports = router;