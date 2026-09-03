import { useEffect, useState } from "react";
import orderService from "../services/order.service";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const result = await orderService.getAllOrders();

      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Cannot load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cannot update order status");
    }
  };

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Order Management</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Shipping Address</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>{order.user_id}</td>

                <td>{Number(order.total_amount).toLocaleString()} VND</td>

                <td>{order.shipping_address}</td>

                <td>{order.payment_method}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;
