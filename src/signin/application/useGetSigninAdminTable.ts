import type { Pageable } from '@/core/dominio/Pageable';
import { defaultSigninTable } from '@/signin/domain/SigninTable';
import { getSigninAdminTable } from '@/signin/infrastructure/useCases/getSigninAdminTable';

export function useGetSigninAdminTable() {
  const loading = ref<boolean>(false);

  async function refetch(filters: Pageable) {
    loading.value = true;

    try {
      return await getSigninAdminTable(filters);
    } catch (error) {
      return defaultSigninTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
