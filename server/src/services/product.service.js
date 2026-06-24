const ProductModel = require("../models/product.model");

const getAllProducts = async () => {
    const products = await ProductModel.getAllProducts();

    return products;
};

module.exports = {
    getAllProducts,
};