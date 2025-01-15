import { createAxiosInstance } from './axios-config';

const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL || '');

type Profile = {
  email: string;
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    try {
      const response = await api.get('/profile');
      return {
        email: response.data.email
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
}; 