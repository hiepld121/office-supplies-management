import { useEffect, useState } from "react";
import orderService from "../services/order.service";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            const result = await orderService.getMyOrders();

            if (result.success) {
                setOrders(result.data);
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Cannot load orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Order History</h1>

            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>

                                <td>
                                    {Number(
                                        order.total_amount
                                    ).toLocaleString()}{" "}
                                    VND
                                </td>

                                <td>
                                    {order.payment_method}
                                </td>

                                <td>
                                    {order.status}
                                </td>

                                <td>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;