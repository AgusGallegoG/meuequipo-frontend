import { useMeToast } from '@/core/hooks/useMeToast';
import type { RivalFilters } from '@/rivals/domain/RivalFilters';
import { defaultRivalTable } from '@/rivals/domain/RivalTable';
import { getRivalsAdminTable } from '@/rivals/infrastructure/useCases/getRivalsAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetRivalsAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(tableFilters: RivalFilters) {
    loading.value = true;
    try {
      return await getRivalsAdminTable(tableFilters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('signin.title')]),
        severity: 'warn',
      });
      return defaultRivalTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
