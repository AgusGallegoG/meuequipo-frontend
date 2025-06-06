import type { Pageable } from '@/core/dominio/Pageable';
import { defaultSponsorTable } from '@/sponsor/domain/SponsorTable';
import { getSponsorAdminTable } from '@/sponsor/infrastructure/useCases/getSponsorAdminTable';

export function useGetSponsorsAdminTable() {
  const loading = ref<boolean>(false);

  async function refetch(tableFilters: Pageable) {
    loading.value = true;
    try {
      return await getSponsorAdminTable(tableFilters);
    } catch (error) {
      return defaultSponsorTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
