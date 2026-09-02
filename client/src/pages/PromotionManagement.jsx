import { useEffect, useState } from "react";
import promotionService from "../services/promotion.service";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    discount_percent: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchPromotions = async () => {
    try {
      const result = await promotionService.getAllPromotions();

      if (result.success) {
        setPromotions(result.data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Cannot load promotions");
    }
  };

  useEffect(() => {
    fetchPromotions();
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
      description: "",
      discount_percent: "",
      start_date: "",
      end_date: "",
      status: "active",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const promotionData = {
        name: form.name,
        description: form.description,
        discount_percent: Number(form.discount_percent),
        start_date: form.start_date,
        end_date: form.end_date,
        status: form.status,
      };

      if (editingId) {
        await promotionService.updatePromotion(editingId, promotionData);

        alert("Promotion updated successfully");
      } else {
        await promotionService.createPromotion(promotionData);

        alert("Promotion created successfully");
      }

      resetForm();
      fetchPromotions();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (promotion) => {
    setEditingId(promotion.id);

    setForm({
      name: promotion.name || "",
      description: promotion.description || "",
      discount_percent: promotion.discount_percent || "",
      start_date: promotion.start_date ? promotion.start_date.slice(0, 10) : "",
      end_date: promotion.end_date ? promotion.end_date.slice(0, 10) : "",
      status: promotion.status || "active",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this promotion?")) {
      return;
    }

    try {
      await promotionService.deletePromotion(id);

      alert("Promotion deleted successfully");

      fetchPromotions();
    } catch (error) {
      alert(error.response?.data?.message || "Cannot delete promotion");
    }
  };

  return (
    <div>
      <h1>Promotion Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Promotion name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Promotion description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount_percent"
          placeholder="Discount %"
          min="1"
          max="100"
          value={form.discount_percent}
          onChange={handleChange}
          required
        />

        <label>Start Date</label>

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
        />

        <label>End Date</label>

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">
          {editingId ? "Update Promotion" : "Create Promotion"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
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
            <th>Discount</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {promotions.map((promotion) => (
            <tr key={promotion.id}>
              <td>{promotion.id}</td>

              <td>{promotion.name}</td>

              <td>{promotion.discount_percent}%</td>

              <td>{promotion.start_date?.slice(0, 10)}</td>

              <td>{promotion.end_date?.slice(0, 10)}</td>

              <td>{promotion.status}</td>

              <td>
                <button onClick={() => handleEdit(promotion)}>Edit</button>

                <button onClick={() => handleDelete(promotion.id)}>
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

export default PromotionManagement;
