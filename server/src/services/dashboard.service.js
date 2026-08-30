const DashboardModel = require("../models/dashboard.model");

const getDashboardStats = async () => {
    return await DashboardModel.getDashboardStats();
};

module.exports = {
    getDashboardStats,
};