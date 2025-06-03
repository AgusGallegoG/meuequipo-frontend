import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import type { RivalFilters } from '../domain/RivalFilters';
import type { Rival } from '../domain/RivalTable';
import { mapRivalToRequestSaveRival } from '../infrastructure/services/rivalsService';
import { saveRival } from '../infrastructure/useCases/saveRival';

export function useSaveRival() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(rival: Rival, filters: RivalFilters) {
    loading.value = true;
    try {
      const response = await withLoading(async () =>
        saveRival(mapRivalToRequestSaveRival(rival), filters)
      );
      if (response.content.length > 0 && response.totalRecords) {
        showToast({
          title: t('rivals.title'),
          message: t('toast.messages.success.save_success', [
            ' o ' + t('rivals.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
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
