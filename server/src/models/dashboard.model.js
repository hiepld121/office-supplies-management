const db = require("../config/db");

const getDashboardStats = async () => {
    // Tổng số sản phẩm
    const [[productStats]] = await db.execute(`
        SELECT COUNT(*) AS total_products
        FROM products
    `);

    // Tổng số khách hàng
    const [[customerStats]] = await db.execute(`
        SELECT COUNT(*) AS total_customers
        FROM users
        WHERE role_id = 2
    `);

    // Tổng số đơn hàng
    const [[orderStats]] = await db.execute(`
        SELECT COUNT(*) AS total_orders
        FROM orders
    `);

    // Tổng doanh thu
    const [[revenueStats]] = await db.execute(`
        SELECT COALESCE(SUM(total_amount), 0) AS total_revenue
        FROM orders
        WHERE status = 'completed'
    `);

    return {
        total_products: productStats.total_products,
        total_customers: customerStats.total_customers,
        total_orders: orderStats.total_orders,
        total_revenue: revenueStats.total_revenue,
    };
};

module.exports = {
    getDashboardStats,
};