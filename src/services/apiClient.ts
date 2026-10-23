import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: (() => void) | null) {
  onUnauthorized = callback;
}

// ─── Axios Instance ───
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      if (onUnauthorized) {
        onUnauthorized();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;