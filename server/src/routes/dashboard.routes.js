const express = require("express");

const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");

const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRole } = require("../middleware/role.middleware");

router.get(
    "/",
    authenticateToken,
    authorizeRole(1),
    DashboardController.getDashboardStats
);

module.exports = router;