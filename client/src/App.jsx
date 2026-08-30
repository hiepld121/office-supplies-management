
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AdminRoute from "./components/AdminRoute";

import ProductList from "./pages/ProductList";

import CategoryList from "./pages/CategoryList";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";

import ProductManagement from "./pages/ProductManagement";

import CategoryManagement from "./pages/CategoryManagement";

import SupplierManagement from "./pages/SupplierManagement";

import PromotionManagement from "./pages/PromotionManagement";

import OrderManagement from "./pages/OrderManagement";

import Navbar from "./components/Navbar";

import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/categories" element={<CategoryList />} />

        <Route path="/products" element={<ProductList />} />

        <Route
          path="/cart"
          element={
            <AdminRoute>
              <Cart />
            </AdminRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <AdminRoute>
              <Checkout />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Route
        path="/orders"
        element={
          <AdminRoute>
            <Orders />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <CategoryManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/suppliers"
        element={
          <AdminRoute>
            <SupplierManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/promotions"
        element={
          <AdminRoute>
            <PromotionManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <OrderManagement />
          </AdminRoute>
        }
      />
      </main>
    </BrowserRouter>
  );
}

export default App;
