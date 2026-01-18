import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminBooks from "./pages/AdminBooks";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AddBook from "./pages/AddBook";

export default function App() {
  const location = useLocation();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            user?.role === "ADMIN"
              ? <Navigate to="/admin" replace />
              : <Home />
          }
        />

        <Route
          path="/login"
          element={
            user
              ? user.role === "ADMIN"
                ? <Navigate to="/admin" replace />
                : <Navigate to="/" replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            user
              ? <Navigate to="/" replace />
              : <Register />
          }
        />

        <Route path="/shop" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/admin"
          element={
            user?.role === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/categories"
          element={
            user?.role === "ADMIN"
              ? <AdminCategories />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/books"
          element={
            user?.role === "ADMIN"
              ? <AdminBooks />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/books/add"
          element={
            user?.role === "ADMIN"
              ? <AddBook />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/users"
          element={
            user?.role === "ADMIN"
              ? <AdminUsers />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/orders"
          element={
            user?.role === "ADMIN"
              ? <AdminOrders />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </CartProvider>
  );
}
