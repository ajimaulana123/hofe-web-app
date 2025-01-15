import { createAxiosInstance } from './axios-config';

const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL || '');

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
      const response = await api.post('/detect-hoax/text', { text });
      if (response.data.status === "success") {
        return {
          success: true,
          prediction: response.data.result.prediction,
          text: response.data.text,
          rateLimit: response.data.rateLimit
        };
      }
      throw new Error(response.data.message || 'Failed to analyze text');
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to analyze text'
      };
    }
  },

  async predictUrl(url: string) {
    try {
      const response = await api.post('/detect-hoax/url', { url });
      const result = response.data.result;
      
      let prediction = 'unknown';
      if (Array.isArray(result)) {
        prediction = result[0].prediction;
      } else if (typeof result === 'object' && result.prediction) {
        prediction = result.prediction;
      } else if (typeof result === 'string') {
        prediction = result;
      }

      return {
        url: url,
        result: prediction,
        cleaned_content: response.data.cleaned_content
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to analyze URL');
    }
  }
}; 