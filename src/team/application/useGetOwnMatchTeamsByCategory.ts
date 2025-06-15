import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getOwnMatchTeamsByCategory } from '../infrastructure/useCases/getOwnMatchTeamsByCategory';

export function useGetOwnMatchTeamsByCategory() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(categoryId: number) {
    loading.value = true;
    try {
      return await getOwnMatchTeamsByCategory(categoryId);
    } catch (error) {
      showToast({
        title: t('matches.fields.local'),
        message: t('toast.messages.errors.fetch_error', [t('matches.fields.local').toLowerCase()]),
        severity: 'warn',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
