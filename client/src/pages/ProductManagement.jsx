import { useEffect, useState } from "react";
import productService from "../services/product.service";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        stock_quantity: "",
        sku: "",
        category_id: "",
        supplier_id: "",
    });

    const [editingId, setEditingId] = useState(null);

    const fetchProducts = async () => {
        try {
            const result = await productService.getAllProducts();

            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load products"
            );
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            name: "",
            price: "",
            stock_quantity: "",
            sku: "",
            category_id: "",
            supplier_id: "",
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                name: form.name,
                price: Number(form.price),
                stock_quantity: Number(form.stock_quantity),
                sku: form.sku,
                category_id: Number(form.category_id),
                supplier_id: Number(form.supplier_id),
            };

            if (editingId) {
                await productService.updateProduct(
                    editingId,
                    productData
                );

                alert("Product updated successfully");
            } else {
                await productService.createProduct(productData);

                alert("Product created successfully");
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Operation failed"
            );
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);

        setForm({
            name: product.name || "",
            price: product.price || "",
            stock_quantity: product.stock_quantity || "",
            sku: product.sku || "",
            category_id: product.category_id || "",
            supplier_id: product.supplier_id || "",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) {
            return;
        }

        try {
            await productService.deleteProduct(id);

            alert("Product deleted successfully");

            fetchProducts();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot delete product"
            );
        }
    };

    return (
        <div>
            <h1>Product Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock_quantity"
                    placeholder="Stock quantity"
                    value={form.stock_quantity}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={form.sku}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="category_id"
                    placeholder="Category ID"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="supplier_id"
                    placeholder="Supplier ID"
                    value={form.supplier_id}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editingId ? "Update Product" : "Create Product"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>

                            <td>{product.name}</td>

                            <td>
                                {Number(
                                    product.price
                                ).toLocaleString()}{" "}
                                VND
                            </td>

                            <td>{product.stock_quantity}</td>

                            <td>{product.sku}</td>

                            <td>
                                {product.category_name ||
                                    product.category_id}
                            </td>

                            <td>
                                {product.supplier_name ||
                                    product.supplier_id}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        handleEdit(product)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(product.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;