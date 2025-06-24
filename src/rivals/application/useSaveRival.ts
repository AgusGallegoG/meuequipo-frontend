import { useMeToast } from '@/core/hooks/useMeToast';
import type { Rival } from '@/rivals/domain/RivalTable';
import { mapRivalToRequestSaveRival } from '@/rivals/infrastructure/services/rivalsService';
import { saveRival } from '@/rivals/infrastructure/useCases/saveRival';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';

export function useSaveRival() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(rival: Rival) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await saveRival(mapRivalToRequestSaveRival(rival))
      );
      showToast({
        title: t('rivals.title'),
        message: t('toast.messages.success.save_success', [
          ' o ' + t('rivals.title').toLowerCase(),
        ]),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('rivals.title'),
        message: t('toast.messages.errors.save_error', [t('rivals.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
