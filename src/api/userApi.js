import api from "./axios";

export const registerUser = (user) => {
  return api.post("/api/users/register", user);
};

export const loginUser = (user) => {
  return api.post("/api/users/login", user);
};

export const getAllUsers = () => {
  return api.get("/api/users");
};

export const updateUserRole = (id, role) => {
  return api.put(`/api/users/${id}/role`, { role });
};
