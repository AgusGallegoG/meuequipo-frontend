import { useMeToast } from '@/core/hooks/useMeToast';
import { getActiveSeason } from '@/season/infrastructure/useCases/getActiveSeason';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { emptySeason } from '../domain/Season';

export function useGetActiveSeason() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch() {
    loading.value = true;
    try {
      return await withLoading(async () => await getActiveSeason());
    } catch (error) {
      showToast({
        title: t('admin.dashboard.season.title'),
        message: t('toast.messages.errors.fetch_error', [
          t('admin.dashboard.season.title_active').toLowerCase(),
        ]),
        severity: 'error',
      });
      return emptySeason;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
