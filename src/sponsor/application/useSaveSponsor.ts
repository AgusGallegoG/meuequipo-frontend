import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import { useSponsorAdminStore } from '@/sponsor/store/SponsorAdminStore';
import { useI18n } from 'vue-i18n';
import { mapSponsorToRequestSaveSponsor } from '../infrastructure/services/sponsorsService';
import { saveSponsor } from '../infrastructure/useCases/saveSponsor';

export function useSaveSponsor() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const sponsorStore = useSponsorAdminStore();

  async function refetch(sponsor: Sponsor) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () =>
          await saveSponsor(mapSponsorToRequestSaveSponsor(sponsor), sponsorStore.getFilters)
      );

      if (response.content.length > 0 && response.totalRecords) {
        showToast({
          title: t('sponsors.title'),
          message: t('toast.messages.success.save_success', [
            ' o ' + t('sponsors.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      showToast({
        title: t('sponsors.title'),
        message: t('toast.messages.errors.save_error', [t('users.sponsors').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
