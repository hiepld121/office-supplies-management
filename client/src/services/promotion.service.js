import api from "./api";

const getAllPromotions = async () => {
    const response = await api.get("/promotions");
    return response.data;
};

const getPromotionById = async (id) => {
    const response = await api.get(`/promotions/${id}`);
    return response.data;
};

const createPromotion = async (promotionData) => {
    const response = await api.post("/promotions", promotionData);
    return response.data;
};

const updatePromotion = async (id, promotionData) => {
    const response = await api.put(
        `/promotions/${id}`,
        promotionData
    );
    return response.data;
};

const deletePromotion = async (id) => {
    const response = await api.delete(`/promotions/${id}`);
    return response.data;
};

export default {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion,
};