import { useEffect, useState } from "react";
import {
  getAllCategories,
  addCategory,
  deleteCategory
} from "../api/categoryApi";

function CategoryList({ onLogout }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = () => {
    getAllCategories().then(res => setCategories(res.data));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    addCategory({ name }).then(() => {
      setName("");
      loadCategories();
    });
  };

  const handleDelete = (id) => {
    deleteCategory(id).then(() => loadCategories());
  };

  return (
    <div>
      <h2>Categories</h2>

      <button onClick={onLogout}>Logout</button>

      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
