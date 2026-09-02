import { useEffect, useState } from "react";
import categoryService from "../services/category.service";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const result = await categoryService.getAllCategories();

      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Cannot load categories.");
    } finally {
      setLoading(false);
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
        await categoryService.updateCategory(editingId, {
          name: name,
        });
      } else {
        await categoryService.createCategory({
          name: name,
        });
      }

      setName("");
      setEditingId(null);

      await fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed.");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Cannot delete category.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="management-page">
      <h1>Category Management</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">{editingId ? "Update" : "Add Category"}</button>

        {editingId && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Categories</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
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
                  <button onClick={() => handleEdit(category)}>Edit</button>

                  <button onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryManagement;
