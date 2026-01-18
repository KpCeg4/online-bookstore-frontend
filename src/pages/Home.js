import { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookApi";
import { getAllCategories } from "../api/categoryApi";
import FeaturedCarousel from "../components/FeaturedCarousel";
import SmallBookCard from "../components/SmallBookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [isFeaturedSelected, setIsFeaturedSelected] = useState(true);

  useEffect(() => {
    getAllBooks()
      .then(res => {
        const allBooks = res.data || [];
        setBooks(allBooks);
        const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
        setDefaultBooks(shuffled.slice(0, 6));
      })
      .catch(() => {
        setBooks([]);
        setDefaultBooks([]);
      });

    getAllCategories()
      .then(res => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  const handleFeaturedClick = () => {
    setSelectedCategory(null);
    setIsFeaturedSelected(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsFeaturedSelected(false);
  };

  const displayedBooks = isFeaturedSelected
    ? defaultBooks
    : books.filter(
        b => b.category && b.category.id === selectedCategory?.id
      );

  return (
    <div className="container mt-4">
      <FeaturedCarousel books={books} />

      <div className="mt-5">
        <h5 className="mb-3">Browse by Category</h5>

        <div className="category-selector">
          <div
            className={`category-chip ${isFeaturedSelected ? "active" : ""}`}
            onClick={handleFeaturedClick}
          >
            Featured
          </div>

          {categories.map(cat => (
            <div
              key={cat.id}
              className={`category-chip ${
                selectedCategory?.id === cat.id && !isFeaturedSelected
                  ? "active"
                  : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      <h4 className="mt-5 text-center">
        {isFeaturedSelected
          ? "Featured Books"
          : selectedCategory?.name}
      </h4>

      <div className="row g-3 mt-3">
        {displayedBooks.map(book => (
          <div className="col-md-2" key={book.id}>
            <SmallBookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
