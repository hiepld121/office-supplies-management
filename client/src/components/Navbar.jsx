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

    const isAdmin = roleId === "1";

    return (
        <nav className="navbar">
            <Link to="/">Office Supplies</Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/categories">Categories</Link>

                {token && (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/orders">Orders</Link>
                    </>
                )}

                {isAdmin && (
                    <>
                        <Link to="/admin/dashboard">
                            Dashboard
                        </Link>
                        <Link to="/admin/products">
                            Products
                        </Link>
                        <Link to="/admin/categories">
                            Categories
                        </Link>
                        <Link to="/admin/suppliers">
                            Suppliers
                        </Link>
                        <Link to="/admin/promotions">
                            Promotions
                        </Link>
                        <Link to="/admin/orders">
                            Orders
                        </Link>
                    </>
                )}

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;