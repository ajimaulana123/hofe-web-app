import { writable } from 'svelte/store';
import type { AuthResponse } from '$lib/services/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: AuthResponse['user'] | null;
  loading: boolean;
}

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  return {
    subscribe,
    setUser: (user: AuthResponse['user']) => 
      update(state => ({ ...state, user, isAuthenticated: true })),
    clearUser: () => 
      update(state => ({ ...state, user: null, isAuthenticated: false })),
    setLoading: (loading: boolean) => 
      update(state => ({ ...state, loading }))
  };
};

export const authStore = createAuthStore(); 