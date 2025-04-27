import { useRouter } from 'vue-router';
import { useAuthStore } from '@/auth/store/authStore';
import { removeAuthTokenCookie } from '@/auth/infrastructure/service/authService';
import { UtilBase } from '@/core/utilities/UtilBase';

export function useLogout() {
  const authStore = useAuthStore();
  const router = useRouter();

  async function logout() {
    //put pageloader
    debugger;
    authStore.$reset();
    removeAuthTokenCookie();
    //stop pageloader
    router.push({ name: 'AdminLogin' }); //will Redirect to login
  }

  return { logout };
}
