const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/product.controller");

router.post("/", ProductController.createProduct);


router.get("/", ProductController.getAllProducts);


router.get("/:id", ProductController.getProductById);


router.delete("/:id", ProductController.deleteProduct);

router.put("/:id", ProductController.updateProduct);


module.exports = router;