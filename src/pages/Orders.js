import { useEffect, useState } from "react";
import { getUserOrders, getAllOrders } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "ADMIN") {
      getAllOrders().then(res => setOrders(res.data));
    } else {
      getUserOrders().then(res => setOrders(res.data));
    }
  }, [user, navigate]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        {user?.role === "ADMIN" ? "All Orders" : "My Orders"}
      </h3>

      {orders.length === 0 && (
        <p className="text-center">No orders found</p>
      )}

      {orders.map(order => (
        <div key={order.id} className="card mb-3 p-3">
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Date:</strong> {order.orderDate}</div>
          <div><strong>Total:</strong> ₹{order.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}
