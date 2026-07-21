const authorizeRole = (roleId) => {
  return (req, res, next) => {
    if (req.user && req.user.role_id === roleId) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required role.",
      });
    }
  };
};

module.exports = {
  authorizeRole,
};
