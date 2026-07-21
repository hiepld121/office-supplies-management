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

const loginUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await AuthService.loginUser(userData);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: user.token,
            user: {
                id: user.user.id,
                email: user.user.email,
                role_id: user.user.role_id,
            },
            
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};