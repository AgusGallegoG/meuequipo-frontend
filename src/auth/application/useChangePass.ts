import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ChangePass } from '../domain/ChangePass';
import { mapChangePassToRequestChangePass } from '../infrastructure/service/authService';
import { changePass } from '../infrastructure/useCases/changePass';

export function useChangePass() {
  const loading = ref(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(request: ChangePass) {
    try {
      loading.value = true;
      await withLoading(async () => await changePass(mapChangePassToRequestChangePass(request))); // await login(request);
      showToast({
        title: t('admin.login.changepass_name'),
        message: t('core.messages.success.changepass'),
        severity: 'success',
      });
    } catch (error) {
      showToast({
        title: t('admin.login.changepass_name'),
        message: t('core.messages.error.changepass'),
        severity: 'error',
      });
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
