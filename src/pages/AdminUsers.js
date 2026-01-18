import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { getAllUsers, updateUserRole } from "../api/userApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUpdate = async (id, role) => {
    if (!window.confirm("Confirm role change?")) return;
    setLoading(true);
    await updateUserRole(id, role);
    await loadUsers();
    setLoading(false);
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

        <h3 className="text-center fw-bold mb-4">Manage Users</h3>

        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={user.role}
                    disabled={user.email === currentUser.email}
                    onChange={e =>
                      setUsers(prev =>
                        prev.map(u =>
                          u.id === user.id
                            ? { ...u, role: e.target.value }
                            : u
                        )
                      )
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={loading || user.email === currentUser.email}
                    onClick={() => handleUpdate(user.id, user.role)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="alert alert-info">No users found</div>
        )}
      </div>
    </>
  );
}
