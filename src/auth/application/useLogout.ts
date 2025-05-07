import { removeAuthTokenCookie } from '@/auth/infrastructure/service/authService';
import { useAuthStore } from '@/auth/store/authStore';
import { useRouter } from 'vue-router';

export function useLogout() {
  const authStore = useAuthStore();
  const router = useRouter();

  async function logout() {
    authStore.$reset();
    removeAuthTokenCookie();
    router.push({ name: 'AdminLogin' }); //will Redirect to login
  }

  return { logout };
}
