import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/orders").then(res => {
      setOrders(res.data);
    });
  }, []);

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

        <h3 className="text-center fw-bold mb-4">All Confirmed Orders</h3>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>User Email</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userEmail}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
