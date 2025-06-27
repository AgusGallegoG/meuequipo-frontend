import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMeToast } from '../hooks/useMeToast';
import { checkSigninPeriod } from '../infrastructure/useCases/checkSigninPeriod';

export function useCheckSigninPeriod() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const authStore = useAuthStore();
  const { t } = useI18n();

  async function refetch() {
    loading.value = true;
    try {
      return await checkSigninPeriod();
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('toast.title.error'),
          message: t('toast.messages.errors.fetch_error', ['Footer']),
          severity: 'warn',
        });
      }
      //No mostramos error al usuario normal. Sí al adminstrador. Devolvemos false
      return false;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
