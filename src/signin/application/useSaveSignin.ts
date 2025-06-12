import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import type { Signin } from '../domain/Signin';
import { mapSigninToRequestSignin } from '../infrastructure/service/signinService';
import { saveSignin } from '../infrastructure/useCases/saveSignin';
import { useSigninAdminStore } from '../store/SgininAdminStore';

export function useSaveSignin() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);
  const signinAdminStore = useSigninAdminStore();

  async function refetch(signin: Signin) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveSignin(mapSigninToRequestSignin(signin), signinAdminStore.getFilters);
      });
      if (response) {
        showToast({
          title: t('signin.title'),
          message: t('toast.messages.success.save_success', [
            ' a ' + t('signin.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
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
