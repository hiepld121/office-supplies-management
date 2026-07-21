const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/product.controller");

const { authenticateToken } = require("../middleware/auth.middleware");

const { authorizeRole } = require("../middleware/role.middleware");

const { validateProduct } = require("../middleware/product.validation");


router.post(
    "/",
    authenticateToken,
    authorizeRole(1),
    validateProduct,
    ProductController.createProduct
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    validateProduct,
    ProductController.deleteProduct
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole(1),
    validateProduct,
    ProductController.updateProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);



module.exports = router;