import api from "./axios";

export const getAllCategories = () => {
  return api.get("/api/categories");
};

export const addCategory = (category) => {
  return api.post("/api/categories", category);
};

export const deleteCategory = (id) => {
  return api.delete(`/api/categories/${id}`);
};
