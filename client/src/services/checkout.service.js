import api from "./api";

const checkout = async ({ shipping_address, payment_method }) => {
    const response = await api.post("/orders/checkout", {
        shipping_address,
        payment_method,
    });

    return response.data;
};

export default {
    checkout,
};