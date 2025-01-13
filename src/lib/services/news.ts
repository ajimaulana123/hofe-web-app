import { createAxiosInstance } from './axios-config';
import { authService } from './auth';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api = createAxiosInstance(API_URL);

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = authService.getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await authService.logout();
    }
    return Promise.reject(error);
  }
);

export const newsService = {
  async getNews() {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch news');
    }
  },

  async predictText(text: string) {
    try {
      const response = await api.post('/news/predict/text', { text });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to analyze text');
    }
  },

  async predictUrl(url: string) {
    try {
      const response = await api.post('/news/predict/url', { url });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to analyze URL');
    }
  }
}; 