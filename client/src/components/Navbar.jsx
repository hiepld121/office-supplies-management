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
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Office Supplies
            </Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>

                <Link to="/products">
                    Products
                </Link>

                {token && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/orders">
                            My Orders
                        </Link>
                    </>
                )}

                {token && roleId === "1" && (
                    <Link to="/admin/dashboard">
                        Admin
                    </Link>
                )}

                {token ? (
                    <button
                        className="navbar-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;