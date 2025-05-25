import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { defaultUserTable, type UserItem } from '@/user/domain/UserTable';
import { createRequestSaveUserFromUserItem } from '@/user/infrastructure/services/usersService';
import { saveUser } from '@/user/infrastructure/useCases/saveUser';
import { useUserAdminStore } from '@/user/store/userAdminStore';
import { useI18n } from 'vue-i18n';

export function useSaveUser() {
  const loading = ref<boolean>();
  const { showToast } = useMeToast();
  const { t } = useI18n();
  const userStore = useUserAdminStore();

  async function refetch(user: UserItem) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await saveUser(createRequestSaveUserFromUserItem(user), userStore.getFilters)
      );
      if (response.content.length > 0 && response.totalRecords) {
        showToast({
          title: t('users.title'),
          message: t('toast.messages.success.save_success', [
            ' o ' + t('users.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
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
