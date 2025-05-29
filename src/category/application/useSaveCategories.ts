import { type CategoryItem } from '@/category/domain/CategoryTable';
import { createRequestSaveCategoryFromCategoryItem } from '@/category/infrastructure/service/categoryService';
import { saveCategory } from '@/category/infrastructure/useCases/saveCategory';
import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';

export function useSaveCategories() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(category: CategoryItem) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await saveCategory(createRequestSaveCategoryFromCategoryItem(category))
      );
      if (response.content.length > 0) {
        showToast({
          title: t('categories.title'),
          message: t('toast.messages.success.save_success', [
            ' a ' + t('categories.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      showToast({
        title: t('categories.title'),
        message: t('toast.messages.errors.save_error', [
          ' a ' + t('categories.title').toLowerCase(),
        ]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
