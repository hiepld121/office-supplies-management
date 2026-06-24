const ProductModel = require("../models/product.model");

const getAllProducts = async () => {
    const products = await ProductModel.getAllProducts();

    return products;
};

const getProductById = async (id) => {
    const product = await ProductModel.getProductById(id);

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
};