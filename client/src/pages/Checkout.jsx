import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cart.service";
import checkoutService from "../services/checkout.service";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    shipping_address: "",
    payment_method: "cod",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCart = async () => {
    try {
      const result = await cartService.getCart();

      if (result.success) {
        setCartItems(result.data);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Cannot load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.original_price) * Number(item.quantity),
    0,
  );

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.discounted_price) * Number(item.quantity),
    0,
  );

  const discount = subtotal - total;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await checkoutService.checkout({
        shipping_address: form.shipping_address,
        payment_method: form.payment_method,
      });

      if (result.success) {
        alert("Order created successfully.");

        navigate("/orders");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Cannot create order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading checkout...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>

        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          <label>Shipping Address</label>

          <textarea
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            placeholder="Enter your shipping address"
            rows="5"
            required
          />

          <label>Payment Method</label>

          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>

            <option value="bank_transfer">Bank Transfer</option>
          </select>

          <button type="submit" disabled={submitting}>
            {submitting ? "Processing..." : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.product_id}>
              <div>
                <strong>{item.product_name}</strong>

                <p>
                  {item.quantity} ×{" "}
                  {Number(item.original_price).toLocaleString()} VND
                </p>

                {Number(item.discount_percent) > 0 && (
                  <p>Discount: {item.discount_percent}%</p>
                )}
              </div>

              <strong>
                {(
                  Number(item.discounted_price) * Number(item.quantity)
                ).toLocaleString()}{" "}
                VND
              </strong>
            </div>
          ))}

          <hr />

          <hr />

          <div className="checkout-subtotal">
            <span>Subtotal</span>

            <strong>{subtotal.toLocaleString()} VND</strong>
          </div>

          {discount > 0 && (
            <div className="checkout-discount">
              <span>Discount</span>

              <strong>-{discount.toLocaleString()} VND</strong>
            </div>
          )}

          <div className="checkout-total">
            <span>Total</span>

            <strong>{total.toLocaleString()} VND</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
