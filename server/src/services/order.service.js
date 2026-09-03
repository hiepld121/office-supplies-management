const db = require("../config/db");
const CartModel = require("../models/cart.model");
const OrderModel = require("../models/order.model");
const PromotionModel = require("../models/promotion.model");

const getAllOrders = async () => {
  return await OrderModel.getAllOrders();
};

const getOrderById = async (id) => {
  return await OrderModel.getOrderById(id);
};

const getOrdersByUserId = async (userId) => {
  return await OrderModel.getOrdersByUserId(userId);
};

const createOrder = async (orderData) => {
  return await OrderModel.createOrder(orderData);
};

const updateOrderStatus = async (id, status) => {
  return await OrderModel.updateOrderStatus(id, status);
};

const deleteOrder = async (id) => {
  return await OrderModel.deleteOrder(id);
};

const checkout = async (orderData) => {
  const connection = await db.getConnection();

  try {
    // =========================================
    // 1. START TRANSACTION
    // =========================================

    await connection.beginTransaction();

    // =========================================
    // 2. GET CART
    // =========================================

    const cartItems = await CartModel.getCartByUserId(
      orderData.user_id,
      connection
    );

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // =========================================
    // 3. CHECK STOCK
    // =========================================

    for (const item of cartItems) {
      if (Number(item.quantity) > Number(item.stock_quantity)) {
        throw new Error(
          `Insufficient stock for product: ${item.product_name}`
        );
      }
    }

    // =========================================
    // 4. GET PRODUCT IDS
    // =========================================

    const productIds = cartItems.map(
      (item) => item.product_id
    );

    // =========================================
    // 5. GET ACTIVE PROMOTIONS
    // =========================================

    const promotions =
      await PromotionModel.getActivePromotionsByProductIds(
        connection,
        productIds
      );

    // =========================================
    // 6. CALCULATE DISCOUNTED PRICE
    // =========================================

    const cartItemsWithDiscount = cartItems.map(
      (item) => {
        const promotion = promotions.find(
          (p) =>
            Number(p.product_id) ===
            Number(item.product_id)
        );

        const originalPrice = Number(item.price);

        let finalPrice = originalPrice;
        let discountPercent = 0;

        if (promotion) {
          discountPercent = Number(
            promotion.discount_percent
          );

          finalPrice = Math.round(
            originalPrice *
              (100 - discountPercent) /
              100
          );
        }

        return {
          ...item,

          // Giá cuối cùng sau promotion
          price: finalPrice,

          // Có thể dùng để debug / hiển thị
          original_price: originalPrice,
          discount_percent: discountPercent,
        };
      }
    );

    // =========================================
    // 7. CALCULATE TOTAL
    // =========================================

    const totalAmount =
      cartItemsWithDiscount.reduce(
        (total, item) => {
          return (
            total +
            Number(item.price) *
              Number(item.quantity)
          );
        },
        0
      );

    // =========================================
    // 8. CREATE ORDER + ORDER DETAILS
    // =========================================

    const orderId =
      await OrderModel.createOrderWithDetails(
        connection,
        {
          ...orderData,
          total_amount: totalAmount,
        },
        cartItemsWithDiscount
      );

    // =========================================
    // 9. COMMIT TRANSACTION
    // =========================================

    await connection.commit();

    // =========================================
    // 10. RETURN RESULT
    // =========================================

    return {
      orderId,
      totalAmount,
    };
  } catch (error) {
    // =========================================
    // ROLLBACK IF ERROR
    // =========================================

    await connection.rollback();

    throw error;
  } finally {
    // =========================================
    // RELEASE CONNECTION
    // =========================================

    connection.release();
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  checkout,
};