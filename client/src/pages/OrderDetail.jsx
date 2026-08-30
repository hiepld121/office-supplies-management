import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import orderService from "../services/order.service";

const OrderDetail = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const result = await orderService.getOrderById(id);

            if (result.success) {
                setOrder(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load order details."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) {
        return <p>Loading order...</p>;
    }

    if (!order) {
        return (
            <div className="empty-orders">
                <h2>Order not found</h2>

                <Link to="/orders">
                    <button>Back to Orders</button>
                </Link>
            </div>
        );
    }

    // Backend có thể trả order_details hoặc items
    const items = order.order_details || order.items || [];

    return (
        <div className="order-detail-page">
            <div className="order-detail-header">
                <div>
                    <h1>Order #{order.id}</h1>

                    <p>
                        {new Date(
                            order.created_at
                        ).toLocaleString()}
                    </p>
                </div>

                <span className="order-status">
                    {order.status}
                </span>
            </div>

            <div className="order-detail-info">
                <div>
                    <h3>Shipping Address</h3>
                    <p>{order.shipping_address}</p>
                </div>

                <div>
                    <h3>Payment Method</h3>
                    <p>{order.payment_method}</p>
                </div>
            </div>

            <div className="order-detail-products">
                <h2>Order Items</h2>

                {items.length === 0 ? (
                    <p>No order items found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, index) => (
                                <tr
                                    key={
                                        item.product_id ||
                                        item.id ||
                                        index
                                    }
                                >
                                    <td>
                                        {item.product_name ||
                                            item.name}
                                    </td>

                                    <td>
                                        {item.quantity}
                                    </td>

                                    <td>
                                        {Number(
                                            item.price
                                        ).toLocaleString()}{" "}
                                        VND
                                    </td>

                                    <td>
                                        {(
                                            Number(item.price) *
                                            Number(item.quantity)
                                        ).toLocaleString()}{" "}
                                        VND
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="order-detail-total">
                <span>Total</span>

                <strong>
                    {Number(
                        order.total_amount
                    ).toLocaleString()}{" "}
                    VND
                </strong>
            </div>

            <Link to="/orders">
                <button>Back to Orders</button>
            </Link>
        </div>
    );
};

export default OrderDetail;