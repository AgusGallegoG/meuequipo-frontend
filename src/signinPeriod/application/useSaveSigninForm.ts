import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { defaultResponseSigninData } from '../domain/ResponseSigninData';
import { updateSigninForm } from '../infrastructure/useCases/updateSigninForm';

export function useSaveSigninForm() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(file: File) {
    loading.value = true;
    try {
      const response = await updateSigninForm(file);
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.d_update_success'),
        severity: 'success',
      });

      return response;
    } catch (error) {
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.d_update_error'),
        severity: 'warn',
      });
      return defaultResponseSigninData;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
