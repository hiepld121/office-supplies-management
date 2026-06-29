const AuthService = require("../services/auth.service");

const registerUser = async (req, res) => {
    try {
        const userData = req.body;

        const result = await AuthService.registerUser(userData);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: result.insertId,
        });
    } catch (error) {
        if(error.message === "Email already exists") {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    registerUser,
};