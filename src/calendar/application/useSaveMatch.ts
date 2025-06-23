import { saveMatch } from '@/calendar/infrastructure/useCases/saveMatch';
import { useMeToast } from '@/core/hooks/useMeToast';
import type { Match } from '@/shared/dominio/Match';
import { mapMatchToRequestMatch } from '@/shared/infrastructure/service/matchService';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';

export function useSaveMatch() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(match: Match) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveMatch(mapMatchToRequestMatch(match));
      });
      showToast({
        title: t('matches.title'),
        message: t('toast.messages.success.save_success', [
          ' o ' + t('matches.title').toLowerCase(),
        ]),
        severity: 'success',
      });

      return response;
    } catch (error) {
      showToast({
        title: t('matches.title'),
        message: t('toast.messages.errors.save_error', [t('matches.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
