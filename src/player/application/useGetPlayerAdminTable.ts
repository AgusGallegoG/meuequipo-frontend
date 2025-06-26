import { useMeToast } from '@/core/hooks/useMeToast';
import type { PlayerFilter } from '@/player/domain/PlayerFilter';
import { defaultPlayerTable } from '@/player/domain/PlayerTable';
import { getPlayerAdminTable } from '@/player/infrastructure/useCases/getPlayerAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetPlayerAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(filters: PlayerFilter) {
    loading.value = true;

    try {
      return await getPlayerAdminTable(filters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('player.title')]),
        severity: 'warn',
      });
      return defaultPlayerTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
