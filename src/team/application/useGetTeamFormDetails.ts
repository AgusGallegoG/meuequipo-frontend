import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';
import { defaultTeamForm } from '../domain/Team';
import { getTeamFormDetails } from '../infrastructure/useCases/getTeamFormDetails';

export function useGetTeamFormDetails() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(teamId: number) {
    loading.value = true;
    try {
      return await withLoading(async () => {
        return await getTeamFormDetails(teamId);
      });
    } catch (error) {
      showToast({
        title: t('teams.title'),
        message: t('toast.messages.errors.fetch_errors', [t('teams.title').toLowerCase()]),
        severity: 'error',
      });
      return defaultTeamForm;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
