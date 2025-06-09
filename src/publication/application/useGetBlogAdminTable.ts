import type { Pageable } from '@/core/dominio/Pageable';
import { defaultBlogAdminTable } from '@/publication/domain/BlogAdminTable';
import { getBlogAdminTable } from '@/publication/infrastructure/useCases/getBlogAdminTable';

export function useGetBlogAdminTable() {
  const loading = ref<boolean>(false);

  async function refetch(tableFilters: Pageable) {
    loading.value = true;
    try {
      return await getBlogAdminTable(tableFilters);
    } catch (error) {
      return defaultBlogAdminTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
