// src/utils/api.js (Dimodifikasi: Tambahkan serviceService)
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

// Existing services...
export const doctorService = {
  getAll: () => api.get("/doctors"),
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post("/doctors", data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => api.delete(`/doctors/${id}`),
};

export const articleService = {
  getAll: (params) => api.get("/articles", { params }),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post("/articles", data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),
};

export const jobService = {
  getAll: () => api.get("/jobs"),
  getById: (id) => api.get(`/jobs/${id}`),
  apply: (applicationData) => api.post("/applications", applicationData),
};

export const uploadService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const dashboardService = {
  getStats: () => api.get("/dashboard/stats"),
};

// ⭐ HERO IMAGE SERVICE (BARU)
export const heroImageService = {
  // Public endpoints (tidak perlu auth)
  getAll: (activeOnly = false) =>
    api.get("/hero-images", { params: { activeOnly } }),

  getById: (id) => api.get(`/hero-images/${id}`),

  toggleActive: (id) => api.patch(`/hero-images/${id}/toggle-active`),
};

// ⭐ SERVICE SERVICE (BARU DITAMBAHKAN)
export const serviceService = {
  getAll: () => api.get("/services"), // Mendapatkan semua layanan
  getBySlug: (slug) => api.get(`/services/slug/${slug}`), // Mendapatkan detail layanan berdasarkan slug
};

export default api;
