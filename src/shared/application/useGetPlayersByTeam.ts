import { useMeToast } from '@/core/hooks/useMeToast';
import { getPlayersByTeam } from '@/shared/infrastructure/useCases/getPlayersByTeam';
import { useI18n } from 'vue-i18n';

export function useGetPlayersByTeam() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(teamId: number) {
    loading.value = true;

    try {
      return await getPlayersByTeam(teamId);
    } catch (error) {
      showToast({
        title: t('teams.fields.players'),
        message: t('toast.messages.errors.fetch_errors', [t('teams.fields.players').toLowerCase()]),
        severity: 'error',
      });
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
