import api from "./api";

const checkout = async (orderData) => {
    const response = await api.post(
        "/orders/checkout",
        orderData
    );

    return response.data;
};

export default {
    checkout,
};