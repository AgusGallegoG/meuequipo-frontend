import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { mapTeamFormToRequestTeamForm } from '@/team/infrastructure/services/teamService';
import { saveTeamForm } from '@/team/infrastructure/useCases/saveTeamForm';
import { useTeamAdminStore } from '@/team/store/teamAdminStore';
import { useI18n } from 'vue-i18n';
import type { TeamForm } from '../domain/Team';

export function useSaveTeamForm() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);
  const teamAdminStore = useTeamAdminStore();

  async function refetch(teamForm: TeamForm) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveTeamForm(
          mapTeamFormToRequestTeamForm(teamForm),
          teamAdminStore.getFilters
        );
      });
      if (response) {
        showToast({
          title: t('teams.title'),
          message: t('toast.messages.success.save_success', [
            ' a ' + t('teams.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      showToast({
        title: t('teams.title'),
        message: t('toast.messages.errors.save_error', [t('teams.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
