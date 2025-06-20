import type { Pageable } from '@/core/dominio/Pageable';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import { getBlogData } from '@/publication/infrastructure/useCases/getBlogData';
import { defaultPublicationNews } from '../domain/Publication';

export function useGetBlogData() {
  const loading = ref<boolean>(false);

  async function refetch(filters: Pageable) {
    loading.value = true;
    try {
      return await getBlogData(createPageParams(filters));
    } catch (error) {
      return defaultPublicationNews;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
