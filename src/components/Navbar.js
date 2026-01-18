import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/stackreaderlogo.jpg";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, clearCart } = useCart();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    navigate("/login");
  };

  return (
    <nav className="navbar custom-navbar px-4">
      <div className="navbar-left">
        <Link to="/" className="brand-link">
          <img src={logo} alt="StackReader Logo" className="brand-logo" />
          <span className="brand-name">StackReader</span>
          <span className="brand-tagline">Online Bookstore</span>
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>

      <div className="navbar-right">
        {user && (
          <div className="user-dropdown">
            <div className="nav-box">
              {user.name}
            </div>

            <div className="user-menu">
              <Link to="/orders" className="user-menu-item">
                Orders
              </Link>
            </div>
          </div>
        )}

        {user && (
          <Link to="/cart" className="nav-box cart-box">
            <i className="bi bi-cart3"></i>
            <span className="cart-count">{cartCount}</span>
          </Link>
        )}

        {user ? (
          <button className="nav-box nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-box nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
