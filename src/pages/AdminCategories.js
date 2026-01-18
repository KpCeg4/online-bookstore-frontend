import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadCategories = () => {
    api.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = () => {
    setError("");
    if (!name.trim()) return;

    api.post("/api/categories", { name })
      .then(() => {
        setName("");
        loadCategories();
      })
      .catch(() => {
        setError("Unable to add category");
      });
  };

  const handleDelete = (id) => {
    setError("");
    api.delete(`/api/categories/${id}`)
      .then(() => loadCategories())
      .catch(() => {
        setError("Cannot delete category with existing books");
      });
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

        <h3 className="text-center fw-bold mb-4">Manage Categories</h3>

        {error && (
          <div className="alert alert-danger mb-3">
            {error}
          </div>
        )}

        <div className="d-flex gap-2 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="New category name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button
            className="btn btn-primary rounded-btn"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="list-group">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#fffff0" }}
            >
              <span>{cat.name}</span>
              <button
                className="btn btn-danger btn-sm rounded-btn"
                onClick={() => handleDelete(cat.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
