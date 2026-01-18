import axios from "axios";
import api from "./axios";

export const registerUser = (user) => {
  return axios.post("http://localhost:8080/api/users/register", user);
};

export const loginUser = (user) => {
  return axios.post("http://localhost:8080/api/users/login", user);
};

export const getAllUsers = () => {
  return api.get("/api/users");
};

export const updateUserRole = (id, role) => {
  return api.put(`/api/users/${id}/role`, { role });
};
