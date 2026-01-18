import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "../api/bookApi";
import { getAllCategories } from "../api/categoryApi";
import { useCart } from "../context/CartContext";
import "../styles/booklist.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    getAllBooks().then(res => setBooks(res.data || []));
    getAllCategories().then(res => setCategories(res.data || []));
  }, []);

  const getBooksByCategory = (categoryId) =>
    books.filter(b => b.category && b.category.id === categoryId);

  const handleAddToCart = (book) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(book);
  };

  return (
    <div className="container mt-4">
      {categories.map(category => {
        const categoryBooks = getBooksByCategory(category.id);
        if (categoryBooks.length === 0) return null;

        return (
          <div key={category.id} className="category-section mb-5">
            <h4 className="category-title mb-3">{category.name}</h4>

            <div className="book-grid">
              {categoryBooks.map(book => (
                <div className="book-card-large" key={book.id}>
                  <div className="book-image-wrapper-large">
                    <img
                      src={book.imageUrl || "https://via.placeholder.com/160"}
                      alt={book.title}
                    />
                  </div>

                  <div className="book-card-body">
                    <div className="book-card-title">
                      {book.title}
                    </div>

                    <div className="book-card-author">
                      {book.author}
                    </div>

                    <div className="book-card-price">
                      ₹{book.price}
                    </div>

                    {book.stock > 0 ? (
                      <button
                        className="btn btn-primary btn-sm rounded-btn mt-2"
                        onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <span className="badge bg-secondary mt-2">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
