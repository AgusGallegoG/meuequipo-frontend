import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { useMeToast } from '@/core/hooks/useMeToast';
import { getBlogContent } from '@/publication/infrastructure/useCases/getBlogContent';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useGetBlogContents() {
  const { t } = useI18n();
  const loading = ref(false);
  const { showToast } = useMeToast();
  const authStore = useAuthStore();

  async function refetch(isInicio: boolean) {
    try {
      loading.value = true;
      const data = await getBlogContent(isInicio);
      return data;
    } catch (Error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('toast.title.error'),
          message: t('toast.messages.errors.fetch_error', ['Inicio']),
          severity: 'warn',
        });
      }
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
