-- ==================================
-- CREATE DATABASE
-- ==================================

DROP DATABASE IF EXISTS office_supplies_management;

CREATE DATABASE office_supplies_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE office_supplies_management;


-- ==================================
-- TABLE: roles
-- ==================================

-- id
-- name
-- description
-- created_at
-- updated_at

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ==================================
-- TABLE: users
-- ==================================

-- id
-- role_id
-- full_name
-- email
-- password
-- phone
-- address
-- status
-- created_at
-- updated_at
-- deleted_at

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20) UNIQUE,

    address TEXT,

    status ENUM('active', 'inactive')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ==================================
-- TABLE: categories
-- ==================================

-- id
-- name
-- description
-- status
-- created_at
-- updated_at
-- deleted_at

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    status ENUM('active', 'inactive')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL
);

-- ==================================
-- TABLE: suppliers
-- ==================================

-- id
-- name
-- phone
-- email
-- address
-- status
-- created_at
-- updated_at
-- deleted_at


CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) UNIQUE,

    email VARCHAR(255) UNIQUE,

    address TEXT,

    status ENUM('active', 'inactive')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL
);

-- ==================================
-- TABLE: products
-- ==================================

-- id
-- sku
-- category_id
-- supplier_id
-- name
-- description
-- price
-- stock_quantity
-- image
-- status
-- created_at
-- updated_at
-- deleted_at


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    sku VARCHAR(50) NOT NULL UNIQUE,

    category_id INT NOT NULL,

    supplier_id INT NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    price INT NOT NULL,

    stock_quantity INT NOT NULL DEFAULT 0,

    image VARCHAR(255),

    status ENUM('active', 'inactive', 'discontinued')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    INDEX idx_product_name (name),
    INDEX idx_category (category_id),
    INDEX idx_supplier (supplier_id),

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_product_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ==================================
-- TABLE: promotions
-- ==================================

-- id
-- name
-- description
-- discount_percent
-- start_date
-- end_date
-- status
-- created_at
-- updated_at

CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT,

    discount_percent INT NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    CHECK (start_date <= end_date),

    status ENUM('active', 'inactive')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    INDEX idx_promotion_status (status),
    INDEX idx_start_dates (start_date),
    INDEX idx_end_dates (end_date)
);

-- ==================================
-- TABLE: promotion_products
-- ==================================

-- promotion_id
-- product_id

CREATE TABLE promotion_products (
    promotion_id INT NOT NULL,
    product_id INT NOT NULL,

    PRIMARY KEY (promotion_id, product_id),

    CONSTRAINT fk_promotion_product_promotion
        FOREIGN KEY (promotion_id)
        REFERENCES promotions(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_promotion_product_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ==================================
-- TABLE: cart_items
-- ==================================

-- id
-- user_id
-- product_id
-- quantity
-- created_at
-- updated_at

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
        CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_cart_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ==================================
-- TABLE: orders
-- ==================================

-- id
-- user_id
-- total_amount
-- shipping_address
-- payment_method
-- status
-- created_at
-- updated_at

-- ==================================
-- TABLE: order_details
-- ==================================

-- id
-- order_id
-- product_id
-- quantity
-- price
