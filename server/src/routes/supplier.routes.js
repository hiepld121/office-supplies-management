const express = require("express");

const router = express.Router();

const SupplierController = require("../controllers/supplier.controller");

const {
    validateCreateSupplier,
    validateUpdateSupplier,
} = require("../middleware/supplier.validation.middleware");

router.get("/", SupplierController.getAllSuppliers);

router.get("/:id", SupplierController.getSupplierById);

router.post("/", validateCreateSupplier, SupplierController.createSupplier);

router.put("/:id", validateUpdateSupplier, SupplierController.updateSupplier);

router.delete("/:id", SupplierController.deleteSupplier);

module.exports = router;