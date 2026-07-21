const validateProduct = (req, res, next) => {
    const {
        name,
        price,
        stock_quantity,
        sku,
        category_id,
        supplier_id,
    } = req.body;

    // Product name
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product name is required",
        });
    }

    // Price
    if (price === undefined || price === null) {
        return res.status(400).json({
            success: false,
            message: "Price is required",
        });
    }

    if (price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than 0",
        });
    }

    // Stock
    if (stock_quantity === undefined || stock_quantity === null) {
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

    // SKU
    if (!sku || sku.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "SKU is required",
        });
    }

    // Category
    if (!category_id) {
        return res.status(400).json({
            success: false,
            message: "Category is required",
        });
    }

    // Supplier
    if (!supplier_id) {
        return res.status(400).json({
            success: false,
            message: "Supplier is required",
        });
    }

    next();
};

module.exports = {
    validateProduct,
};