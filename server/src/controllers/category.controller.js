const CategoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await CategoryService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createCategory = async (req, res) => {
    try {
        
        const categoryData = req.body;

        const result = await CategoryService.createCategory(categoryData);

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            categoryId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await CategoryService.updateCategory(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await CategoryService.deleteCategory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};