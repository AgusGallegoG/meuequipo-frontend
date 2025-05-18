import { useMeToast } from '@/core/hooks/useMeToast';
import type { SeasonForm } from '@/season/domain/SeasonForm';
import { createRequestNewSeasonFromSeasonForm } from '@/season/infrastructure/service/seasonService';
import { createSeason } from '@/season/infrastructure/useCases/createSeason';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useCreateSeason() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(newSeason: SeasonForm) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await createSeason(createRequestNewSeasonFromSeasonForm(newSeason))
      );
      if (response.length > 0) {
        showToast({
          title: t('admin.dashboard.season.title'),
          message: t('toast.messages.success.create_success', [
            t('admin.dashboard.season.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
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
