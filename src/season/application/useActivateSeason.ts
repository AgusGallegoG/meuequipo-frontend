import { useMeToast } from '@/core/hooks/useMeToast';
import type { Season } from '@/season/domain/Season';
import { activateSeason } from '@/season/infrastructure/useCases/activateSeason';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useActivateSeason() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(newActive: Season) {
    loading.value = true;
    try {
      const response = await withLoading(async () => await activateSeason(newActive));
      showToast({
        title: t('admin.dashboard.season.title'),
        message: t('toast.messages.success.update_success', [
          'a ' + t('admin.dashboard.season.title_active').toLowerCase(),
        ]),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('admin.dashboard.season.title'),
        message: t('toast.messages.errors.update_error', [
          t('admin.dashboard.season.title_active').toLowerCase(),
        ]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
