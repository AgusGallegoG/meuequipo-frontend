import type { LoginRequest } from '@/auth/infrastructure/models/requests/LoginRequest';
import { userDefault } from '@/auth/infrastructure/models/responses/LoginResponse';
import { login } from '@/auth/infrastructure/useCases/login';
import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useLogin() {
  const loading = ref(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(request: LoginRequest) {
    try {
      loading.value = true;
      const data = await withLoading(async () => login(request)); // await login(request);
      showToast({
        title: t('admin.login.toast_name'),
        message: t('core.messages.success.login'),
        severity: 'success',
      });
      return data;
    } catch (error) {
      showToast({
        title: t('admin.login.toast_name'),
        message: t('core.messages.error.login'),
        severity: 'error',
      });
      return userDefault;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
