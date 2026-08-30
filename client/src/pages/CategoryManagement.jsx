import { useEffect, useState } from "react";
import categoryService from "../services/category.service";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchCategories = async () => {
        try {
            const result = await categoryService.getAllCategories();

            if (result.success) {
                setCategories(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load categories"
            );
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        try {
            if (editingId) {
                await categoryService.updateCategory(
                    editingId,
                    { name: name.trim() }
                );

                alert("Category updated successfully");
            } else {
                await categoryService.createCategory({
                    name: name.trim(),
                });

                alert("Category created successfully");
            }

            setName("");
            setEditingId(null);

            fetchCategories();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Operation failed"
            );
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setName(category.name);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) {
            return;
        }

        try {
            await categoryService.deleteCategory(id);

            alert("Category deleted successfully");

            fetchCategories();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot delete category"
            );
        }
    };

    const handleCancel = () => {
        setName("");
        setEditingId(null);
    };

    return (
        <div>
            <h1>Category Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <button type="submit">
                    {editingId
                        ? "Update Category"
                        : "Create Category"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
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
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>

                            <td>{category.name}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        handleEdit(category)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(category.id)
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

export default CategoryManagement;