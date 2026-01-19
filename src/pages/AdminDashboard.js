import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    api.get("/api/orders").then(res => {
      setOrders(res.data);
    });
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <h2 className="mb-5 text-center">
          Welcome, {user?.name}
        </h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card shadow-sm h-100 d-flex justify-content-center"
              style={{ cursor: "pointer", minHeight: "180px" }}
              onClick={() => navigate("/admin/categories")}
            >
              <div className="text-center px-4">
                <h5>Manage Categories</h5>
                <p className="mb-0">Add or remove book categories</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card shadow-sm h-100 d-flex justify-content-center"
              style={{ cursor: "pointer", minHeight: "180px" }}
              onClick={() => navigate("/admin/books")}
            >
              <div className="text-center px-4">
                <h5>Manage Books</h5>
                <p className="mb-0">Update price, stock or delete books</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card shadow-sm h-100 d-flex justify-content-center"
              style={{ cursor: "pointer", minHeight: "180px" }}
              onClick={() => navigate("/admin/users")}
            >
              <div className="text-center px-4">
                <h5>Manage Users</h5>
                <p className="mb-0">Promote or demote users</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card shadow-sm h-100 d-flex justify-content-center"
              style={{ cursor: "pointer", minHeight: "180px" }}
              onClick={() => navigate("/admin/orders")}
            >
              <div className="text-center px-4">
                <h5>Confirmed Orders</h5>
                <h2 className="fw-bold my-2">{orders.length}</h2>
                <p className="mb-0 text-muted">
                  ₹{totalRevenue.toFixed(2)} revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
