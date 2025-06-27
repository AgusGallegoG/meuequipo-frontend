import { useMeToast } from '@/core/hooks/useMeToast';
import { defaultResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import { useI18n } from 'vue-i18n';
import { getSigninPeriodInfo } from '../infrastructure/useCases/getSigninPeriodInfo';

export function useGetSigninPeriodInfo() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch() {
    loading.value = true;
    try {
      const response = await getSigninPeriodInfo();
      return response;
    } catch (error) {
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.err'),
        severity: 'warn',
      });
      return defaultResponseSigninData;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
