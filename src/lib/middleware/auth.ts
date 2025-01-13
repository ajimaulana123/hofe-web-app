import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { AuthService } from '$lib/services/auth';

export const authGuard: Handle = async ({ event, resolve }) => {
  const auth = AuthService.getInstance();
  const protectedPaths = ['/dashboard', '/profile', '/settings']; // tambahkan path yang perlu dilindungi
  
  if (protectedPaths.some(path => event.url.pathname.startsWith(path))) {
    if (!auth.isAuthenticated()) {
      throw redirect(303, '/login');
    }
  }

  return resolve(event);
}; 