const CategoryModel = require("../models/category.model");

const getAllCategories = async () => {
    return await CategoryModel.getAllCategories();
};

const getCategoryById = async (id) => {
    return await CategoryModel.getCategoryById(id);
};

const createCategory = async (categoryData) => {
    return await CategoryModel.createCategory(categoryData);
};

const updateCategory = async (id, categoryData) => {
    return await CategoryModel.updateCategory(id, categoryData);
};

const deleteCategory = async (id) => {
    return await CategoryModel.deleteCategory(id);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};