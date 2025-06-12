import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { defaultSignin } from '@/signin/domain/Signin';
import { getSigninDetails } from '@/signin/infrastructure/useCases/getSigninDetails';
import { useI18n } from 'vue-i18n';

export function useGetSigninDetails() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(signinId: number) {
    loading.value = true;
    try {
      return await withLoading(async () => {
        return await getSigninDetails(signinId);
      });
    } catch (error) {
      showToast({
        title: t('signing.title'),
        message: t('toast.messages.errors.fetch_errors', [t('signing.title').toLowerCase()]),
        severity: 'error',
      });
      return defaultSignin;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
