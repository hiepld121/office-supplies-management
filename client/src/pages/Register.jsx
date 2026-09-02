import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await authService.register(
                formData
            );

            if (result.success) {
                alert("Registration successful. Please login.");
                navigate("/login");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>

                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;