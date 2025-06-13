import type { Pageable } from '@/core/dominio/Pageable';
import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { defaultTeamTable } from '../domain/TeamTable';
import { getTeamAdminTable } from '../infrastructure/useCases/getTeamAdminTable';

export function useGetTeamAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(filters: Pageable) {
    loading.value = true;

    try {
      return await getTeamAdminTable(filters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('teams.title')]),
        severity: 'warn',
      });
      return defaultTeamTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
