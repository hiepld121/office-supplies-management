import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roleId !== "1") {
        return <Navigate to="/products" replace />;
    }

    return children;
};

export default AdminRoute;