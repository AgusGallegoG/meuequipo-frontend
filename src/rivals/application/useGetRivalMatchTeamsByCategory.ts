import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getRivalMatchTeamsByCategory } from '../infrastructure/useCases/getRivalMatchTeamsByCategory';

export function useGetRivalMatchTeamsByCategory() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(categoryId: number) {
    loading.value = true;
    try {
      return getRivalMatchTeamsByCategory(categoryId);
    } catch (error) {
      showToast({
        title: t('matches.fields.visitor'),
        message: t('toast.messages.errors.fetch_error', [
          t('matches.fields.visitor').toLowerCase(),
        ]),
        severity: 'warn',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
