import type { LoginRequest } from '@/auth/infrastructure/models/requests/LoginRequest';
import { userDefault } from '@/auth/infrastructure/models/responses/LoginResponse';
import { login } from '@/auth/infrastructure/useCases/login';
import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { LoginForm } from '../domain/LoginForm';

export function useLogin() {
  const loading = ref(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(request: LoginForm) {
    try {
      loading.value = true;
      const data = await withLoading(async () => await login(request)); // await login(request);
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
      return null;
      // return userDefault;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
