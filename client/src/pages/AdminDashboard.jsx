import { useEffect, useState } from "react";
import dashboardService from "../services/dashboard.service";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_products: 0,
        total_customers: 0,
        total_orders: 0,
        total_revenue: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = async () => {
        try {
            const result = await dashboardService.getDashboardStats();

            if (result.success) {
                setStats(result.data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Cannot load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
    <div className="admin-dashboard">
        <div className="admin-dashboard-header">
            <div>
                <h1>Admin Dashboard</h1>
                <p>
                    Overview of your office supplies system
                </p>
            </div>
        </div>

        <div className="dashboard-grid">
            <div className="dashboard-card">
                <h3>Total Products</h3>
                <strong>
                    {stats.total_products}
                </strong>
            </div>

            <div className="dashboard-card">
                <h3>Total Customers</h3>
                <strong>
                    {stats.total_customers}
                </strong>
            </div>

            <div className="dashboard-card">
                <h3>Total Orders</h3>
                <strong>
                    {stats.total_orders}
                </strong>
            </div>

            <div className="dashboard-card">
                <h3>Total Revenue</h3>
                <strong>
                    {Number(
                        stats.total_revenue
                    ).toLocaleString()}{" "}
                    VND
                </strong>
            </div>
        </div>
    </div>
);
};

export default AdminDashboard;