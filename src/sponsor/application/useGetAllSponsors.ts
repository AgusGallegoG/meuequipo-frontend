import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getAllSponsors } from '../infrastructure/useCases/getAllSponsors';

export function useGetAllSponsors() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const authStore = useAuthStore();

  async function refetch() {
    try {
      return await getAllSponsors();
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('toast.title.error'),
          message: t('toast.messages.errors.fetch_error', ['Patrocinadores']),
          severity: 'warn',
        });
      }
      return [];
    }
  }

  return { refetch };
}
