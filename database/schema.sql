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

-- ==================================
-- TABLE: categories
-- ==================================

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

-- ==================================
-- TABLE: suppliers
-- ==================================

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

-- ==================================
-- TABLE: promotions
-- ==================================

-- id
-- name
-- discount_percent
-- start_date
-- end_date
-- status
-- created_at
-- updated_at

-- ==================================
-- TABLE: promotion_products
-- ==================================

-- promotion_id
-- product_id

-- ==================================
-- TABLE: cart_items
-- ==================================

-- id
-- user_id
-- product_id
-- quantity
-- created_at
-- updated_at

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
