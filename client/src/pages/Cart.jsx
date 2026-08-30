import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cart.service";

const navigate = useNavigate();
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const result = await cartService.getCart();

      if (result.success) {
        setCart(result.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Cannot load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await cartService.updateCartItem(id, quantity);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Cannot update cart");
    }
  };

  const handleDelete = async (id) => {
    try {
      await cartService.deleteCartItem(id);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Cannot delete cart item");
    }
  };

  const handleClear = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
    } catch (error) {
      alert(error.response?.data?.message || "Cannot clear cart");
    }
  };

  const total = cart.reduce((sum, item) => sum + Number(item.subtotal), 0);

  if (loading) {
    return <h2>Loading cart...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.product_name}</h3>

              <p>Price: {Number(item.price).toLocaleString()} VND</p>

              <p>Subtotal: {Number(item.subtotal).toLocaleString()} VND</p>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleUpdate(item.id, Number(e.target.value))}
              />

              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}

          <hr />

          <h2>Total: {total.toLocaleString()} VND</h2>

          <button onClick={handleClear}>Clear Cart</button>

          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
