INSERT INTO roles (name, description)
VALUES
('admin', 'System administrator'),
('customer', 'Customer account');

INSERT INTO users (full_name, email, password, phone, address, role_id)
VALUES
('Admin', 'admin@gmail.com', 'admin123', '010111111111', 'diachi1', 1),
('Le Dai Hiep', 'hiepld@gmail.com', 'hiepld123', '010122222222', 'diachi2', 1),
('Nguyen Van A', 'nguyenvana@gmail.com', 'nguyenvana123', '010133333333', 'diachi3', 2),
('Tran Van B', 'tranvanb@gmail.com', 'tranvanb123', '010144444444', 'diachi4', 2);

INSERT INTO categories (name)
VALUES
('Viết chì'),
('Viết bi'),
('Giấy in'),
('Sổ tay');


INSERT INTO suppliers(name, email, phone)
VALUES
(
'Công ty Thiên Long',
'contact@thienlong.vn',
'0900000001'
),
(
'Công ty Hồng Hà',
'contact@hongha.vn',
'0900000002'
),
(
'Double A Việt Nam',
'contact@doublea.vn',
'0900000003'
);

INSERT INTO products(name, price, stock_quantity, category_id, supplier_id, sku)
VALUES
('Bút chì 2B Thiên Long', 5000, 100, 1, 1, 'BL001'),
('Bút bi Thiên Long', 9000, 200, 2, 1, 'BB001'),
('Giấy A4 Hồng Hà', 10000, 50, 3, 2, 'GA001'),
('Sổ tay Double A', 8000, 75, 4, 3, 'ST001'),
('Sổ tay Thiên Long', 8500, 60, 4, 1, 'ST002');

INSERT INTO promotions(name, description, discount_percent, start_date, end_date)
VALUES
('Khuyến mãi hè', 'Giảm giá 20% cho tất cả sản phẩm', 20, '2026-06-01', '2026-08-31'),
('Khuyến mãi mùa thu', 'Giảm giá 15% cho tất cả sản phẩm', 15, '2026-09-01', '2026-11-30');

INSERT INTO promotion_products(promotion_id, product_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5);

INSERT INTO cart_items(user_id, product_id, quantity)
VALUES
(3, 1, 2),
(3, 3, 1),
(4, 2, 3),
(4, 4, 2);

INSERT INTO orders(user_id, total_amount, shipping_address, payment_method, status)
VALUES
(3, 20000, 'diachi3', 'credit_card', 'pending'),
(4, 43000, 'diachi4', 'bank_transfer', 'processing'),
(2, 42500, 'diachi2', 'credit_card', 'delivered');

INSERT INTO order_details (order_id, product_id, quantity, price)
VALUES
(1, 1, 2, 5000),
(1, 3, 1, 10000),
(2, 2, 3, 9000),
(2, 4, 2, 8000),
(3, 5, 5, 8500);

