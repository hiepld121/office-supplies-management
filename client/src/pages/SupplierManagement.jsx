import { useEffect, useState } from "react";
import supplierService from "../services/supplier.service";

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [editingId, setEditingId] = useState(null);

    const fetchSuppliers = async () => {
        try {
            const result = await supplierService.getAllSuppliers();

            if (result.success) {
                setSuppliers(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load suppliers"
            );
        }
    };

    useEffect(() => {
        fetchSuppliers();
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
            phone: "",
            email: "",
            address: "",
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await supplierService.updateSupplier(
                    editingId,
                    form
                );

                alert("Supplier updated successfully");
            } else {
                await supplierService.createSupplier(form);

                alert("Supplier created successfully");
            }

            resetForm();
            fetchSuppliers();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Operation failed"
            );
        }
    };

    const handleEdit = (supplier) => {
        setEditingId(supplier.id);

        setForm({
            name: supplier.name || "",
            phone: supplier.phone || "",
            email: supplier.email || "",
            address: supplier.address || "",
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this supplier?")) {
            return;
        }

        try {
            await supplierService.deleteSupplier(id);

            alert("Supplier deleted successfully");

            fetchSuppliers();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot delete supplier"
            );
        }
    };

    return (
        <div>
            <h1>Supplier Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Supplier name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingId
                        ? "Update Supplier"
                        : "Create Supplier"}
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
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.phone}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.address}</td>

                            <td>
                                <button
                                    onClick={() =>
                                        handleEdit(supplier)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(supplier.id)
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

export default SupplierManagement;