const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

    console.log("===== AUTH MIDDLEWARE =====");
    console.log(req.headers.authorization);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token.",
            });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
};