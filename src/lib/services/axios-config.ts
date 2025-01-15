import axios from 'axios';
import { authService } from './auth';

export function createAxiosInstance(baseURL: string) {
  const instance = axios.create({ 
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config) => {
      const token = authService.getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config.url.includes('/profile')) {
        await authService.logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
} 