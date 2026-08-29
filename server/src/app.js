const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const supplierRoutes = require("./routes/supplier.routes");
const promotionRoutes = require("./routes/promotion.routes");
const promotionProductRoutes = require("./routes/promotion_product.routes");
const orderRoutes = require("./routes/order.routes");



app.use(cors());

app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/suppliers", supplierRoutes);
  
app.use("/api/promotions", promotionRoutes);

app.use("/api/promotions", promotionProductRoutes);

app.use("/api/orders", orderRoutes);
  
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Office Supplies Management API is running",
  });
});

module.exports = app;
