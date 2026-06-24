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

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
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
    getProductById,
};