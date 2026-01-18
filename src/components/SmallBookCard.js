import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function SmallBookCard({ book }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(book);
  };

  return (
    <div className="card small-book-card p-2 text-center">
      <div className="small-book-image-wrapper">
        <img
          src={book.imageUrl || "https://via.placeholder.com/120"}
          className="small-book-image"
          alt={book.title}
        />
      </div>

      <div className="small-book-content">
        <div className="small-book-title">
          {book.title}
        </div>

        <div className="small-book-price">
          ₹{book.price}
        </div>
      </div>

      {book.stock > 0 && (
        <button
          className="btn btn-primary btn-sm rounded-btn mt-2 mx-auto"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
