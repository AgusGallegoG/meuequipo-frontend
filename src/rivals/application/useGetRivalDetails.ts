import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import { defaultRival } from '../domain/RivalTable';
import { getRivalDetails } from '../infrastructure/useCases/getRivalDetails';

export function useGetRivalDetails() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(rivlaId: number) {
    loading.value = true;
    try {
      return await withLoading(async () => {
        return await getRivalDetails(rivlaId);
      });
    } catch (error) {
      showToast({
        title: t('rivals.title'),
        message: t('toast.messages.errors.fetch_errors', [t('rivals.title').toLowerCase()]),
        severity: 'error',
      });
      return defaultRival;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
