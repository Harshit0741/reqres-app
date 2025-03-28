import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const loginUser = (email, password) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const fetchUsers = (page = 1) => {
  return axios.get(`${API_BASE_URL}/users?page=${page}`);
};

export const updateUser = (id, data) => {
  return axios.put(`${API_BASE_URL}/users/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};
