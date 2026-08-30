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
        <div>
            <h1>Admin Dashboard</h1>

            <div>
                <div>
                    <h3>Total Products</h3>
                    <p>{stats.total_products}</p>
                </div>

                <div>
                    <h3>Total Customers</h3>
                    <p>{stats.total_customers}</p>
                </div>

                <div>
                    <h3>Total Orders</h3>
                    <p>{stats.total_orders}</p>
                </div>

                <div>
                    <h3>Total Revenue</h3>
                    <p>
                        {Number(
                            stats.total_revenue
                        ).toLocaleString()}{" "}
                        VND
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;