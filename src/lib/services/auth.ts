import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const isBrowser = typeof window !== 'undefined';

const getStoredToken = () => {
  if (!isBrowser) return null;
  return Cookies.get('token');
};

const setStoredToken = (token: string) => {
  if (!isBrowser) return;
  Cookies.set('token', token, { expires: 7, path: '/' });
};

const removeStoredToken = () => {
  if (!isBrowser) return;
  Cookies.remove('token', { path: '/' });
};

export const authService = {
  getStoredToken,

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data?.token) {
        setStoredToken(response.data.token);
        return response.data;
      }
      throw new Error('Token not found in response');
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  async register(username: string, email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  async logout() {
    try {
      const token = getStoredToken();
      if (token) {
        await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      removeStoredToken();
    } catch (error) {
      removeStoredToken();
    }
  },

  isAuthenticated() {
    return !!getStoredToken();
  }
}; 