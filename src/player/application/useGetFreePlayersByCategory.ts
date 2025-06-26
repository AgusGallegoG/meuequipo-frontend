import { useMeToast } from '@/core/hooks/useMeToast';
import { getFreePlayersByCategory } from '@/player/infrastructure/useCases/getFreePlayersByCategory';
import { useI18n } from 'vue-i18n';

export function useGetFreePlayersByCategory() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(categoryId: number) {
    loading.value = true;

    try {
      return await getFreePlayersByCategory(categoryId);
    } catch (error) {
      showToast({
        title: t('teams.fields.players'),
        message: t('toast.messages.errors.fetch_errors', [t('teams.fields.players').toLowerCase()]),
        severity: 'error',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
