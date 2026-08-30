import api from "./api";

const getMyOrders = async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
};

const getAllOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
};

const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, {
        status,
    });

    return response.data;
};

export default {
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
};