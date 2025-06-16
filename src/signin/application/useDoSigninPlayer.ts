import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import type { Signin } from '../domain/Signin';
import { mapSigninToRequestSignin } from '../infrastructure/service/signinService';
import { doSigninPlayer } from '../infrastructure/useCases/doSigninPlayer';

export function useDoSigninPlayer() {
  const loading = ref<boolean>(false);
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(signin: Signin) {
    loading.value = true;
    try {
      await withLoading(
        async () => await doSigninPlayer(mapSigninToRequestSignin(signin)),
        t('core.states.processing')
      );

      showToast({
        title: t('signin.success.title'),
        message: t('signin.success.message'),
        severity: 'success',
        life: 5000,
      });
    } catch (error) {
      showToast({
        title: t('toast.title.error'),
        message: t('toast.messages.errors.signin_error'),
        severity: 'warn',
      });
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
