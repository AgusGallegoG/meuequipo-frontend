import type { RivalFilters } from '@/rivals/domain/RivalFilters';
import { defaultRivalTable } from '@/rivals/domain/RivalTable';
import { getRivalsAdminTable } from '@/rivals/infrastructure/useCases/getRivalsAdminTable';

export function useGetRivalsAdminTable() {
  const loading = ref<boolean>(false);

  async function refetch(tableFilters: RivalFilters) {
    loading.value = true;
    try {
      return await getRivalsAdminTable(tableFilters);
    } catch (error) {
      return defaultRivalTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
