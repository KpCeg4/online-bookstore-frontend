import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, updateBook, deleteBook } from "../api/bookApi";
import { getAllCategories } from "../api/categoryApi";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const booksRes = await getAllBooks();
    const catRes = await getAllCategories();
    setBooks(booksRes.data);
    setCategories(catRes.data);
  };

  const handleChange = (id, field, value) => {
    setBooks(prev =>
      prev.map(b =>
        b.id === id ? { ...b, [field]: value } : b
      )
    );
  };

  const handleCategoryChange = (id, categoryId) => {
    const category = categories.find(c => c.id === Number(categoryId));
    setBooks(prev =>
      prev.map(b =>
        b.id === id ? { ...b, category } : b
      )
    );
  };

  const handleSave = async (book) => {
    await updateBook(book);
    loadData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await deleteBook(id);
    loadData();
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => navigate("/admin")}
          >
            ← Dashboard
          </button>
        </div>

        <h3 className="text-center fw-bold mb-3">Manage Books</h3>

        <div className="mb-3">
          <button
            className="btn btn-primary rounded-btn"
            onClick={() => navigate("/admin/books/add")}
          >
            Add New Book
          </button>
        </div>

        <table className="table align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    style={{ width: "40px", height: "60px", objectFit: "contain" }}
                  />
                </td>

                <td>{book.title}</td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={book.price}
                    onChange={e =>
                      handleChange(book.id, "price", Number(e.target.value))
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={book.stock}
                    onChange={e =>
                      handleChange(book.id, "stock", Number(e.target.value))
                    }
                  />
                </td>

                <td>
                  <select
                    className="form-select form-select-sm"
                    value={book.category?.id || ""}
                    onChange={e =>
                      handleCategoryChange(book.id, e.target.value)
                    }
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-end">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleSave(book)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
