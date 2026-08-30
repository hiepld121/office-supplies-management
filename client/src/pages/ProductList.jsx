import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/product.service";
import cartService from "../services/cart.service";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        try {
            const result = await productService.getAllProducts();

            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!token) {
            alert("Please login to add products to cart.");
            return;
        }

        try {
            await cartService.addToCart(productId, 1);

            alert("Product added to cart.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot add product to cart."
            );
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="product-page">
            <div className="product-header">
                <div>
                    <h1>Products</h1>
                    <p>Discover our office supplies</p>
                </div>

                {token && (
                    <Link to="/cart">
                        <button>View Cart</button>
                    </Link>
                )}
            </div>

            {products.length === 0 ? (
                <div className="empty-products">
                    <p>No products available.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div
                            className="product-card"
                            key={product.id}
                        >
                            <div className="product-image">
                                📦
                            </div>

                            <div className="product-info">
                                <h3>{product.name}</h3>

                                <p className="product-sku">
                                    SKU: {product.sku}
                                </p>

                                <p>
                                    Category:{" "}
                                    {product.category_name ||
                                        product.category_id}
                                </p>

                                <p>
                                    Supplier:{" "}
                                    {product.supplier_name ||
                                        product.supplier_id}
                                </p>

                                <p className="product-price">
                                    {Number(
                                        product.price
                                    ).toLocaleString()}{" "}
                                    VND
                                </p>

                                <p>
                                    Stock:{" "}
                                    {product.stock_quantity}
                                </p>

                                <button
                                    disabled={
                                        product.stock_quantity <= 0
                                    }
                                    onClick={() =>
                                        handleAddToCart(product.id)
                                    }
                                >
                                    {product.stock_quantity > 0
                                        ? "Add to Cart"
                                        : "Out of Stock"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;