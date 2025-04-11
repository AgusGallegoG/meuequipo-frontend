import { useMeToast } from '@/core/hooks/useMeToast';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getBlogContent } from '../infrastructure/useCases/getBlogContent';

export function useGetBlogContents() {
  const { t } = useI18n();
  const loading = ref(false);

  async function refetch(isInicio: boolean) {
    try {
      loading.value = true;
      const data = await getBlogContent(isInicio);
      return data;
    } catch (Error) {
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
