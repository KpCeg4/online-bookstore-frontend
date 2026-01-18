import api from "./axios";

export const createPaymentOrder = (amount) => {
  return api.post("/api/payments/create-order", { amount });
};
