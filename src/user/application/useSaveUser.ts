import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { type UserItem } from '@/user/domain/UserTable';
import { createRequestSaveUserFromUserItem } from '@/user/infrastructure/services/usersService';
import { saveUser } from '@/user/infrastructure/useCases/saveUser';
import { useI18n } from 'vue-i18n';

export function useSaveUser() {
  const loading = ref<boolean>();
  const { showToast } = useMeToast();
  const { t } = useI18n();

  async function refetch(user: UserItem) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await saveUser(createRequestSaveUserFromUserItem(user))
      );
      showToast({
        title: t('users.title'),
        message: t('toast.messages.success.save_success', [' o ' + t('users.title').toLowerCase()]),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('users.title'),
        message: t('toast.messages.errors.save_error', [t('users.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
