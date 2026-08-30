import api from "./api";

const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

const register = async (userData) => {
    const response = await api.post("/auth/register", userData);

    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
};

const getToken = () => {
    return localStorage.getItem("token");
};

export default {
    login,
    register,
    logout,
    getToken,
};