import { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkoutService from "../services/checkout.service";

const Checkout = () => {
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!shippingAddress.trim()) {
            alert("Please enter shipping address");
            return;
        }

        try {
            setLoading(true);

            const result = await checkoutService.checkout(
                shippingAddress,
                paymentMethod
            );

            if (result.success) {
                alert("Order placed successfully");

                navigate("/orders");
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Checkout failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>

            <form onSubmit={handleCheckout}>
                <div>
                    <label>Shipping Address</label>

                    <textarea
                        value={shippingAddress}
                        onChange={(e) =>
                            setShippingAddress(e.target.value)
                        }
                        placeholder="Enter shipping address"
                        rows="4"
                    />
                </div>

                <div>
                    <label>Payment Method</label>

                    <select
                        value={paymentMethod}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    >
                        <option value="cash">
                            Cash on Delivery
                        </option>

                        <option value="bank_transfer">
                            Bank Transfer
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Processing..."
                        : "Place Order"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;