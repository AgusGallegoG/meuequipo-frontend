import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getRivalGameTeamsByCategory } from '../infrastructure/useCases/getRivalGameTeamsByCategory';

export function useGetRivalGameTeamsByCategory() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(categoryId: number) {
    loading.value = true;
    try {
      return getRivalGameTeamsByCategory(categoryId);
    } catch (error) {
      showToast({
        title: t('games.fields.visitor'),
        message: t('toast.messages.errors.fetch_error', [t('games.fields.visitor').toLowerCase()]),
        severity: 'warn',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
