import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");

        navigate("/login");
    };

    return (
        <nav>
            <Link to="/">Home</Link>

            {" | "}

            <Link to="/products">Products</Link>

            {" | "}

            {token && (
                <>
                    <Link to="/cart">Cart</Link>

                    {" | "}

                    <Link to="/orders">My Orders</Link>

                    {" | "}
                </>
            )}

            {token && roleId === "1" && (
                <>
                    <strong>Admin: </strong>

                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>

                    {" | "}

                    <Link to="/admin/products">
                        Products
                    </Link>

                    {" | "}

                    <Link to="/admin/categories">
                        Categories
                    </Link>

                    {" | "}

                    <Link to="/admin/suppliers">
                        Suppliers
                    </Link>

                    {" | "}

                    <Link to="/admin/promotions">
                        Promotions
                    </Link>

                    {" | "}

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                    {" | "}
                </>
            )}

            {token ? (
                <button onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <>
                    <Link to="/login">Login</Link>

                    {" | "}

                    <Link to="/register">
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;