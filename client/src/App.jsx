import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import ProductList from "./pages/ProductList";

import CategoryList from "./pages/CategoryList";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/categories" element={<CategoryList />} />

        <Route path="/products" element={<ProductList />} />

        <Route
    path="/cart"
    element={
        <ProtectedRoute>
            <Cart />
        </ProtectedRoute>
    }

    <Route
    path="/checkout"
    element={
        <ProtectedRoute>
            <Checkout />
        </ProtectedRoute>
    }
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
