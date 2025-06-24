import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import type { TeamForm } from '@/team/domain/Team';
import { mapTeamFormToRequestTeamForm } from '@/team/infrastructure/services/teamService';
import { saveTeamForm } from '@/team/infrastructure/useCases/saveTeamForm';
import { useTeamAdminStore } from '@/team/store/teamAdminStore';
import { useI18n } from 'vue-i18n';

export function useSaveTeamForm() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(teamForm: TeamForm) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveTeamForm(mapTeamFormToRequestTeamForm(teamForm));
      });
      showToast({
        title: t('teams.title'),
        message: t('toast.messages.success.save_success', [' a ' + t('teams.title').toLowerCase()]),
        severity: 'success',
      });
      return response;
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
