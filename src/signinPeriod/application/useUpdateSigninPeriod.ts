import { useMeToast } from '@/core/hooks/useMeToast';
import { defaultResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import type { SigninPeriod } from '@/signinPeriod/domain/SigninPeriod';
import { mapSigninPeriodToRequestUpdate } from '@/signinPeriod/infrastructure/service/signinService';
import { updateSigninPeriod } from '@/signinPeriod/infrastructure/useCases/updateSigninPeriod';
import { useI18n } from 'vue-i18n';

export function useUpdateSigninPeriod() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(signinPeriod: SigninPeriod) {
    loading.value = true;
    try {
      const response = await updateSigninPeriod(mapSigninPeriodToRequestUpdate(signinPeriod));
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.p_update_success'),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('signin_period.title'),
        message: t('signin_period.toast.p_update_error'),
        severity: 'warn',
      });
      return defaultResponseSigninData;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
