import api from "./axios";

export const getAllBooks = () => {
  return api.get("/api/books");
};

export const addBook = (book) => {
  return api.post("/api/books", book);
};

export const deleteBook = (id) => {
  return api.delete(`/api/books/${id}`);
};

export const updateBook = (book) => {
  return api.put("/api/books", book);
};
