import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getAllCategories } from "../api/categoryApi";
import AdminNavbar from "../components/AdminNavbar";

export default function AddBook() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    language: "",
    publisher: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
    categoryName: ""
  });

  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = Object.values(form).every(v => v !== "");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValid) return;

    await api.post("/api/books", {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    });

    navigate("/admin/books");
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => navigate("/admin/books")}
          >
            ← Back
          </button>
        </div>

        <h3 className="text-center fw-bold mb-4">Add New Book</h3>

        <form onSubmit={handleSubmit} className="row g-3">
          {[
            ["title", "Title"],
            ["author", "Author"],
            ["isbn", "ISBN"],
            ["language", "Language"],
            ["publisher", "Publisher"],
            ["price", "Price"],
            ["stock", "Stock"],
            ["imageUrl", "Image URL"]
          ].map(([name, label]) => (
            <div className="col-md-6" key={name}>
              <input
                type="text"
                name={name}
                className="form-control"
                placeholder={label}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="col-md-12">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="col-md-6">
            <select
              name="categoryName"
              className="form-select"
              value={form.categoryName}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-primary rounded-btn px-4"
              disabled={!isValid}
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
