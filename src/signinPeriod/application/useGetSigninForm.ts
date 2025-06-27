import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import { getSigninForm } from '../infrastructure/useCases/getSigninForm';

export function useGetSigninForm() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch() {
    loading.value = true;
    showToast({
      title: t('signin_period.title'),
      message: t('signin_period.downloading'),
      severity: 'info',
      life: 1500,
    });
    try {
      await getSigninForm();
    } catch (error) {
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.d_download_error'),
        severity: 'warn',
      });
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
