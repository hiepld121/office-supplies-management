const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const result = await authService.login(
            email,
            password
        );

        if (result.success) {
            alert("Login successful");

            // Chuyển trang sau khi đăng nhập
            navigate("/");
        }
    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Login failed"
        );
    }
};