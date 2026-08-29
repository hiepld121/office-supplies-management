const validateAddProductToPromotion = (req, res, next) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  next();
};

module.exports = {
  validateAddProductToPromotion,
};