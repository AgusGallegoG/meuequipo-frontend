import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getOwnGameTeamsByCategory } from '../infrastructure/useCases/getOwnGameTeamsByCategory';

export function useGetOwnGameTeamsByCategory() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(categoryId: number) {
    loading.value = true;
    try {
      return await getOwnGameTeamsByCategory(categoryId);
    } catch (error) {
      showToast({
        title: t('games.fields.local'),
        message: t('toast.messages.errors.fetch_error', [t('games.fields.local').toLowerCase()]),
        severity: 'warn',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
