import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const isBrowser = typeof window !== 'undefined';

const getStoredToken = () => {
  if (!isBrowser) return null;
  return Cookies.get('token');
};

const setStoredToken = (token: string) => {
  if (!isBrowser) return;
  Cookies.set('token', token, { 
    expires: 7, 
    path: '/',
    sameSite: 'lax'
  });
};
  
const removeStoredToken = () => {
  if (!isBrowser) return;
  Cookies.remove('token', { path: '/' });
};

export const authService = {
  getStoredToken,
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      const { token } = response.data;
  
      if (token) {
        setStoredToken(token);
        localStorage.setItem('token', token);
        return token;
      }
      throw new Error('No token received');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(username: string, email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
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
        await axios.post(`${API_URL}/logout`, {}, {
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