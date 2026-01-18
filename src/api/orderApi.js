import api from "./axios";

export const placeOrder = (order) => {
  return api.post("/api/orders", order);
};

export const getUserOrders = () => {
  return api.get("/api/orders/user");
};

export const getAllOrders = () => {
  return api.get("/api/orders");
};
