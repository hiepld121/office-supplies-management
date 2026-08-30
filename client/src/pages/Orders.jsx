import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../services/order.service";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const result = await orderService.getMyOrders();

            if (result.success) {
                setOrders(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load orders."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <div>
                    <h1>My Orders</h1>
                    <p>View your order history</p>
                </div>

                <Link to="/products">
                    <button>Continue Shopping</button>
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <h2>No orders yet</h2>

                    <p>
                        You have not placed any orders.
                    </p>

                    <Link to="/products">
                        <button>Start Shopping</button>
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div
                            className="order-card"
                            key={order.id}
                        >
                            <div className="order-card-header">
                                <div>
                                    <h3>
                                        Order #{order.id}
                                    </h3>

                                    <p>
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <span
                                    className={`order-status status-${order.status}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-card-body">
                                <div>
                                    <strong>
                                        Payment
                                    </strong>

                                    <p>
                                        {order.payment_method}
                                    </p>
                                </div>

                                <div>
                                    <strong>
                                        Shipping Address
                                    </strong>

                                    <p>
                                        {order.shipping_address}
                                    </p>
                                </div>

                                <div className="order-total">
                                    <strong>Total</strong>

                                    <p>
                                        {Number(
                                            order.total_amount
                                        ).toLocaleString()}{" "}
                                        VND
                                    </p>
                                </div>
                            </div>

                            <div className="order-card-footer">
                                <Link
                                    to={`/orders/${order.id}`}
                                >
                                    <button>
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;