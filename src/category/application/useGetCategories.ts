import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { defaultCategoryTable } from '@/category/domain/CategoryTable';
import { getCategoriesTable } from '@/category/infrastructure/useCases/getCategoriesTable';
import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';

export function useGetCategories() {
  const loading = ref<boolean>(false);
  const authStore = useAuthStore();
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch() {
    loading.value = true;
    try {
      return await getCategoriesTable();
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('toast.title.error'),
          message: t('toast.messages.errors.fetch_error', [t('category.title')]),
          severity: 'warn',
        });
      }
      return defaultCategoryTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
