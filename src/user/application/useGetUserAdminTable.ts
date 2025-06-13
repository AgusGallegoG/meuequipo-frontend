import type { Pageable } from '@/core/dominio/Pageable';
import { useMeToast } from '@/core/hooks/useMeToast';
import { defaultUserTable } from '@/user/domain/UserTable';
import { getUserAdminTable } from '@/user/infrastructure/useCases/getUserAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetUserAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(tableFilters: Pageable) {
    loading.value = true;
    try {
      return await getUserAdminTable(tableFilters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('users.title')]),
        severity: 'warn',
      });
      return defaultUserTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
