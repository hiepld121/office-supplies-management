const SupplierService = require("../services/supplier.service");

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierService.getAllSuppliers();

        return res.status(200).json({
            success: true,
            data: suppliers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;

        const supplier = await SupplierService.getSupplierById(id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: supplier,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createSupplier = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            address,
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Supplier name is required",
            });
        }

        const result = await SupplierService.createSupplier({
            name: name.trim(),
            phone,
            email,
            address,
        });

        return res.status(201).json({
            success: true,
            message: "Supplier created successfully",
            supplierId: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await SupplierService.updateSupplier(
            id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await SupplierService.deleteSupplier(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Supplier deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};