import type { Pageable } from '@/core/dominio/Pageable';
import { useMeToast } from '@/core/hooks/useMeToast';
import { defaultSponsorTable } from '@/sponsor/domain/SponsorTable';
import { getSponsorAdminTable } from '@/sponsor/infrastructure/useCases/getSponsorAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetSponsorsAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(tableFilters: Pageable) {
    loading.value = true;
    try {
      return await getSponsorAdminTable(tableFilters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('sponsors.title')]),
        severity: 'warn',
      });

      return defaultSponsorTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
