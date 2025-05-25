import type { Pageable } from '@/core/dominio/Pageable';
import { defaultUserTable } from '@/user/domain/UserTable';
import { getUserAdminTable } from '@/user/infrastructure/useCases/getUserAdminTable';

export function useGetUserAdminTable() {
  const loading = ref<boolean>(false);

  async function refetch(tableFilters: Pageable) {
    loading.value = true;
    try {
      return await getUserAdminTable(tableFilters);
    } catch (error) {
      return defaultUserTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
