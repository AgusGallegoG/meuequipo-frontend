import type { Pageable } from '@/core/dominio/Pageable';
import { useMeToast } from '@/core/hooks/useMeToast';
import type { SigninFilters } from '@/signin/domain/SigninFilters';
import { defaultSigninTable } from '@/signin/domain/SigninTable';
import { getSigninAdminTable } from '@/signin/infrastructure/useCases/getSigninAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetSigninAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(filters: SigninFilters) {
    loading.value = true;

    try {
      return await getSigninAdminTable(filters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('signin.title')]),
        severity: 'warn',
      });
      return defaultSigninTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
