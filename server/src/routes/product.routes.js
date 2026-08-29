const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/product.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

const {
    validateCreateProduct,
    validateUpdateProduct
} = require("../middleware/product.validation.middleware");

router.post(
    "/",
    authenticateToken,
    authorizeRole(1),
    validateCreateProduct,
    ProductController.createProduct
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    validateUpdateProduct,
    ProductController.updateProduct
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    ProductController.deleteProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

module.exports = router;