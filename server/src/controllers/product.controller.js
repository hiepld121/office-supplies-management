const ProductService = require("../services/product.service");

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
};