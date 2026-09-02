const express = require("express");

const router = express.Router();

const CategoryController = require("../controllers/category.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

// Get all categories
router.get(
    "/",
    authenticateToken,
    CategoryController.getAllCategories
);

// Get category by ID
router.get(
    "/:id",
    authenticateToken,
    CategoryController.getCategoryById
);

// Create category - Admin
router.post(
    "/",
    authenticateToken,
    authorizeRole(1),
    CategoryController.createCategory
);

// Update category - Admin
router.put(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    CategoryController.updateCategory
);

// Delete category - Admin
router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    CategoryController.deleteCategory
);

module.exports = router;