const validateCreateSupplier = (req, res, next) => {
    const { name, phone, email } = req.body;

    // Validate name
    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Supplier name is required",
        });
    }

    // Validate phone
    if (phone) {
        const phoneRegex = /^[0-9]{10,11}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number",
            });
        }
    }

    // Validate email
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });
        }
    }

    next();
};

const validateUpdateSupplier = (req, res, next) => {
    const { name, phone, email } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Supplier name is required",
        });
    }

    if (phone) {
        const phoneRegex = /^[0-9]{10,11}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number",
            });
        }
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });
        }
    }

    next();
};

module.exports = {
    validateCreateSupplier,
    validateUpdateSupplier
};