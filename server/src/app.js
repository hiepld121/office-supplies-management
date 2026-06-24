const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/product.routes");

app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Office Supplies Management API is running"
    });
});

module.exports = app;