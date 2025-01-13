import { AuthService } from '$lib/services/auth';
import { authStore } from '$lib/stores/auth';

export const load = async () => {
  const auth = AuthService.getInstance();
  
  // Setup axios interceptors
  auth.setupAxiosInterceptors();
  
  // Check authentication status
  const user = auth.getUser();
  if (user) {
    authStore.setUser(user);
  }
  
  return {
    user
  };
}; 