import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import type { Publication } from '../domain/Publication';
import { createRequestSavePublicationFromPublication } from '../infrastructure/services/publicationService';
import { savePublication } from '../infrastructure/useCases/savePublication';
import { useBlogAdminStore } from '../store/BlogAdminStore';

export function useSavePublication() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const blogStore = useBlogAdminStore();

  async function refetch(publication: Publication) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await savePublication(createRequestSavePublicationFromPublication(publication))
      );
      if (response) {
        showToast({
          title: t('blog.title'),
          message: t('toast.messages.success.save_success', [
            ' a ' + t('blog.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      showToast({
        title: t('blog.title'),
        message: t('toast.messages.errors.save_error', [t('blog.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
