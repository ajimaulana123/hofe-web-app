import { createAxiosInstance } from './axios-config';
import { authService } from './auth';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api = createAxiosInstance(API_URL);

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

export const profileService = {
  async getProfile() {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch profile');
    }
  }
}; 