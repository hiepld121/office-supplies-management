const SupplierModel = require('../models/supplier.model');

const getAllSuppliers = async () => {
    return await SupplierModel.getAllSuppliers();
};

const getSupplierById = async (id) => {
    return await SupplierModel.getSupplierById(id);
};

const createSupplier = async (supplierData) => {
    return await SupplierModel.createSupplier(supplierData);
};

const updateSupplier = async (id, supplierData) => {
    return await SupplierModel.updateSupplier(id, supplierData);
};

const deleteSupplier = async (id) => {
    return await SupplierModel.deleteSupplier(id);
};

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};

