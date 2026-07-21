const validateRegister = (req, res, next) => {
    const { full_name, email, password } = req.body;

    if (!full_name) {
        return res.status(400).json({
            success: false,
            message: "Full name is required",
        });
    }

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        });
    }

    next();
};

module.exports = {
    validateRegister,
};