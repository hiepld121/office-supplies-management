const validateCreateProduct = (req, res, next) => {
    const {
        name,
        price,
        stock_quantity,
        sku,
        category_id,
        supplier_id,
    } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product name is required",
        });
    }

    if (price === undefined || price === null) {
        return res.status(400).json({
            success: false,
            message: "Product price is required",
        });
    }

    if (price < 0) {
        return res.status(400).json({
            success: false,
            message: "Product price cannot be negative",
        });
    }

    if (
        stock_quantity === undefined ||
        stock_quantity === null
    ) {
        return res.status(400).json({
            success: false,
            message: "Stock quantity is required",
        });
    }

    if (stock_quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock quantity cannot be negative",
        });
    }

    if (!sku || !sku.trim()) {
        return res.status(400).json({
            success: false,
            message: "SKU is required",
        });
    }

    if (!category_id) {
        return res.status(400).json({
            success: false,
            message: "Category is required",
        });
    }

    if (!supplier_id) {
        return res.status(400).json({
            success: false,
            message: "Supplier is required",
        });
    }

    next();
};

const validateUpdateProduct = (req, res, next) => {
    const {
        name,
        price,
        stock_quantity,
        sku,
        category_id,
        supplier_id,
    } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Product name is required",
        });
    }

    if (price === undefined || price === null) {
        return res.status(400).json({
            success: false,
            message: "Product price is required",
        });
    }

    if (price < 0) {
        return res.status(400).json({
            success: false,
            message: "Product price cannot be negative",
        });
    }

    if (
        stock_quantity === undefined ||
        stock_quantity === null
    ) {
        return res.status(400).json({
            success: false,
            message: "Stock quantity is required",
        });
    }

    if (stock_quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock quantity cannot be negative",
        });
    }

    if (!sku || !sku.trim()) {
        return res.status(400).json({
            success: false,
            message: "SKU is required",
        });
    }

    if (!category_id) {
        return res.status(400).json({
            success: false,
            message: "Category is required",
        });
    }

    if (!supplier_id) {
        return res.status(400).json({
            success: false,
            message: "Supplier is required",
        });
    }

    next();
};

module.exports = {
    validateCreateProduct,
    validateUpdateProduct,
};