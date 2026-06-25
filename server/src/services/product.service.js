const ProductModel = require("../models/product.model");

const getAllProducts = async () => {
    const products = await ProductModel.getAllProducts();

    return products;
};

const getProductById = async (id) => {
    const product = await ProductModel.getProductById(id);

    return product;
};

const createProduct = async (productData) => {
    const newProduct = await ProductModel.createProduct(productData);

    return newProduct;
};

const deleteProduct = async (id) => {
    const result = await ProductModel.deleteProduct(id);

    return result;
};

const updateProduct = async (id, productData) => {
    const result = await ProductModel.updateProduct(id, productData);

    return result;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};