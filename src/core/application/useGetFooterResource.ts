import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { emptyFooterInfo } from '@/core/dominio/FooterInfo';
import { getFooterResources } from '@/core/infrastructure/useCases/getFooterResources';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMeToast } from '../hooks/useMeToast';

export function useGetFooterResource() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const authStore = useAuthStore();
  const { t } = useI18n();

  function refetch() {
    loading.value = true;
    try {
      return getFooterResources();
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('toast.title.error'),
          message: t('toast.messages.errors.fetch_error', ['Footer']),
          severity: 'warn',
        });
      }
      //No mostramos error al usuario normal. Sí al adminstrador. Devolvemos vacío
      return emptyFooterInfo;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
