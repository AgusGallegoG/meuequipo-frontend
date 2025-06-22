import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import { useMeToast } from '@/core/hooks/useMeToast';
import { getBlogInitContent } from '@/publication/infrastructure/useCases/getBlogInitContent';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useGetBlogInitContents() {
  const { t } = useI18n();
  const loading = ref(false);
  const { showToast } = useMeToast();
  const authStore = useAuthStore();

  async function refetch() {
    try {
      loading.value = true;
      const data = await getBlogInitContent();
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
