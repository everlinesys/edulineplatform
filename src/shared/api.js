import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================
   REQUEST INTERCEPTOR
========================================= */

api.interceptors.request.use(
  (config) => {
    // JWT
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // TENANT DOMAIN
    config.headers["x-tenant-domain"] = window.location.hostname;
    console.log("🔗 API Request:", config);
    return config;
  },

  (error) => Promise.reject(error),
);

export default api;
