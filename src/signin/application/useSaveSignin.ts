import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import type { Signin } from '@/signin/domain/Signin';
import { mapSigninToRequestSignin } from '@/signin/infrastructure/service/signinService';
import { saveSignin } from '@/signin/infrastructure/useCases/saveSignin';
import { useI18n } from 'vue-i18n';

export function useSaveSignin() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(signin: Signin) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveSignin(mapSigninToRequestSignin(signin));
      });
      showToast({
        title: t('signin.title'),
        message: t('toast.messages.success.save_success', [
          ' a ' + t('signin.title').toLowerCase(),
        ]),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('signin.title'),
        message: t('toast.messages.errors.save_error', [t('signin.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
