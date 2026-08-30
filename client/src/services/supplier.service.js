import api from "./api";

const getAllSuppliers = async () => {
    const response = await api.get("/suppliers");
    return response.data;
};

const getSupplierById = async (id) => {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
};

const createSupplier = async (supplierData) => {
    const response = await api.post("/suppliers", supplierData);
    return response.data;
};

const updateSupplier = async (id, supplierData) => {
    const response = await api.put(
        `/suppliers/${id}`,
        supplierData
    );
    return response.data;
};

const deleteSupplier = async (id) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
};

export default {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};