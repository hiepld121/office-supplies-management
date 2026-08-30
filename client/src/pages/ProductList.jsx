import { useEffect, useState } from "react";
import productService from "../services/product.service";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            const result = await productService.getAllProducts();

            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Cannot load products"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Products</h1>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product.id}>
                            <h3>{product.name}</h3>

                            <p>
                                Price: {product.price.toLocaleString()} VND
                            </p>

                            <p>
                                Stock: {product.stock_quantity}
                            </p>

                            <p>
                                SKU: {product.sku}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;