import { useMeToast } from '@/core/hooks/useMeToast';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBlogContent } from '../infrastructure/useCases/getBlogContent';

export function useGetBlogContents() {
  const { t } = useI18n();
  const loading = ref(false);
  const { showToast } = useMeToast();

  async function refetch(isInicio: boolean) {
    try {
      loading.value = true;
      const data = await getBlogContent(isInicio);
      return data;
    } catch (Error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.fetch_error', ['Inicio']),
        severity: 'warn',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
