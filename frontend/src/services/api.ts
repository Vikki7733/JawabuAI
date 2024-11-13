// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Your backend URL
});

// Add an interceptor to set the Authorization header for all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
