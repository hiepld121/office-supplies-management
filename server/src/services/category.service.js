const CategoryModel = require('../models/category.model');

const getAllCategories = async () => {
    const categories = await CategoryModel.getAllCategories();
    return categories;
};

const getCategoryById = async (id) => {
    const category = await CategoryModel.getCategoryById(id);
    return category;
}

const createCategory = async (categoryData) => {
    const result = await CategoryModel.createCategory(categoryData);
    return result;
}

const updateCategory = async (id, categoryData) => {
    const result = await CategoryModel.updateCategory(id, categoryData);
    return result;
}

const deleteCategory = async (id) => {
    const result = await CategoryModel.deleteCategory(id);
    return result;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};