import { useEffect, useState } from "react";
import promotionService from "../services/promotion.service";

const Promotions = () => {
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
    const [loading, setLoading] = useState(true);

    const fetchPromotions = async () => {
        try {
            const result = await promotionService.getAllPromotions();

            if (result.success) {
                setPromotions(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load promotions."
            );
        } finally {
            setLoading(false);
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

            let result;

            if (editingId) {
                result = await promotionService.updatePromotion(
                    editingId,
                    promotionData
                );
            } else {
                result = await promotionService.createPromotion(
                    promotionData
                );
            }

            if (result.success) {
                alert(
                    editingId
                        ? "Promotion updated successfully."
                        : "Promotion created successfully."
                );

                resetForm();
                fetchPromotions();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot save promotion."
            );
        }
    };

    const handleEdit = (promotion) => {
        setEditingId(promotion.id);

        setForm({
            name: promotion.name || "",
            description: promotion.description || "",
            discount_percent: promotion.discount_percent || "",
            start_date: promotion.start_date
                ? promotion.start_date.substring(0, 10)
                : "",
            end_date: promotion.end_date
                ? promotion.end_date.substring(0, 10)
                : "",
            status: promotion.status || "active",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this promotion?")) {
            return;
        }

        try {
            const result = await promotionService.deletePromotion(id);

            if (result.success) {
                alert("Promotion deleted successfully.");

                fetchPromotions();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot delete promotion."
            );
        }
    };

    if (loading) {
        return <p>Loading promotions...</p>;
    }

    return (
        <div className="promotions-page">

            <h1>Promotion Management</h1>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Promotion name"
                        required
                    />
                </div>

                <div>
                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Promotion description"
                        rows="3"
                        required
                    />
                </div>

                <div>
                    <label>
                        Discount (%)
                    </label>

                    <input
                        type="number"
                        name="discount_percent"
                        value={form.discount_percent}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        required
                    />
                </div>

                <div>
                    <label>
                        Start Date
                    </label>

                    <input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>
                        End Date
                    </label>

                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <button type="submit">
                    {editingId
                        ? "Update Promotion"
                        : "Create Promotion"}
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

            {/* PROMOTION LIST */}

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
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

                            <td>
                                {promotion.id}
                            </td>

                            <td>
                                {promotion.name}
                            </td>

                            <td>
                                {promotion.description}
                            </td>

                            <td>
                                {promotion.discount_percent}%
                            </td>

                            <td>
                                {promotion.start_date?.substring(0, 10)}
                            </td>

                            <td>
                                {promotion.end_date?.substring(0, 10)}
                            </td>

                            <td>
                                {promotion.status}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleEdit(promotion)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(promotion.id)
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

export default Promotions;