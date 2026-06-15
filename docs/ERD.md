# Office Supplies Management System

## Database Overview

Hệ thống gồm 9 bảng:

- roles
- users
- categories
- suppliers
- products
- promotions
- promotion_products
- cart_items
- orders
- order_details

---

## Relationship

roles (1) ------ (n) users

categories (1) ------ (n) products

suppliers (1) ------ (n) products

users (1) ------ (n) cart_items

products (1) ------ (n) cart_items

users (1) ------ (n) orders

orders (1) ------ (n) order_details

products (1) ------ (n) order_details

products (n) ------ (n) promotions
                 |
         promotion_products

---

## Table Summary

### roles

Purpose:
Quản lý vai trò người dùng.

Fields:

id

name

description

created_at

updated_at

---

### users

Purpose:
Quản lý thông tin tài khoản.

Fields:

id

role_id

full_name

email

password

phone

address

status

created_at

updated_at

deleted_at

...