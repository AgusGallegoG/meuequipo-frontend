import type { Pageable } from '@/core/dominio/Pageable';
import { useMeToast } from '@/core/hooks/useMeToast';
import { defaultBlogAdminTable } from '@/publication/domain/BlogAdminTable';
import { getBlogAdminTable } from '@/publication/infrastructure/useCases/getBlogAdminTable';
import { useI18n } from 'vue-i18n';

export function useGetBlogAdminTable() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(tableFilters: Pageable) {
    loading.value = true;

    try {
      return await getBlogAdminTable(tableFilters);
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', [t('blog.title')]),
        severity: 'warn',
      });
      return defaultBlogAdminTable;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
