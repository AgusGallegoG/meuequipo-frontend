import { defaultCategoryTable } from '@/category/domain/CategoryTable';
import { getCategoriesTable } from '@/category/infrastructure/useCases/getCategoriesTable';

export function useGetCategories() {
  const loading = ref<boolean>(false);

  async function refetch() {
    loading.value = true;
    try {
      return await getCategoriesTable();
    } catch (error) {
      return defaultCategoryTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
