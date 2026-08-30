import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cart.service";

const Cart = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const result = await cartService.getCart();

            if (result.success) {
                setCartItems(result.data);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot load cart."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            await cartService.updateCartItem(
                productId,
                quantity
            );

            fetchCart();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot update cart."
            );
        }
    };

    const handleRemove = async (productId) => {
        try {
            await cartService.removeFromCart(productId);

            fetchCart();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot remove product."
            );
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm("Clear all items from cart?")) {
            return;
        }

        try {
            await cartService.clearCart();

            fetchCart();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Cannot clear cart."
            );
        }
    };

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.price) * Number(item.quantity),
        0
    );

    if (loading) {
        return <p>Loading cart...</p>;
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <div>
                    <h1>Shopping Cart</h1>
                    <p>
                        {cartItems.length} product(s) in your cart
                    </p>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>

                    <p>
                        Add some products to your cart first.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-list">
                        {cartItems.map((item) => (
                            <div
                                className="cart-item"
                                key={item.product_id}
                            >
                                <div className="cart-item-image">
                                    📦
                                </div>

                                <div className="cart-item-info">
                                    <h3>
                                        {item.product_name}
                                    </h3>

                                    <p>
                                        SKU: {item.sku}
                                    </p>

                                    <p className="cart-item-price">
                                        {Number(
                                            item.price
                                        ).toLocaleString()}{" "}
                                        VND
                                    </p>
                                </div>

                                <div className="quantity-control">
                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                item.product_id,
                                                Number(item.quantity) - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                item.product_id,
                                                Number(item.quantity) + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    {(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    ).toLocaleString()}{" "}
                                    VND
                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        handleRemove(
                                            item.product_id
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div>
                            <span>Total</span>

                            <strong>
                                {total.toLocaleString()} VND
                            </strong>
                        </div>

                        <div>
                            <button
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/products")
                                }
                            >
                                Continue Shopping
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/checkout")
                                }
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;