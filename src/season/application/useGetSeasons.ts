import { useMeToast } from '@/core/hooks/useMeToast';
import { getSeasons } from '@/season/infrastructure/useCases/getSeasons';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useGetSeasons() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch() {
    loading.value = true;
    try {
      return await getSeasons();
    } catch (error) {
      showToast({
        title: t('admin.dashboard.season.title'),
        message: t('toast.messages.errors.fetch_error', [
          t('admin.dashboard.season.title').toLowerCase(),
        ]),
        severity: 'error',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
