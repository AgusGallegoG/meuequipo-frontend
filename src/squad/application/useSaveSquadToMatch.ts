import { useMeToast } from '@/core/hooks/useMeToast';
import { withLoading } from '@/shared/utils/withLoading';
import type { Squad } from '@/squad/domain/Squad';
import { mapSquadToRequestSaveSquad } from '@/squad/infrastructure/services/squadService';
import { saveSquadToMatch } from '@/squad/infrastructure/useCases/saveSquadToMatch';
import { useI18n } from 'vue-i18n';

export function useSaveSquadToMatch() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(squad: Squad) {
    loading.value = true;
    try {
      const response = await withLoading(
        async () => await saveSquadToMatch(mapSquadToRequestSaveSquad(squad)),
        t('core.states.saving')
      );

      if (response) {
        showToast({
          title: t('squads.title'),
          message: t('toast.messages.success.save_success', [
            ' a ' + t('squads.title').toLowerCase(),
          ]),
          severity: 'success',
        });
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      showToast({
        title: t('squads.title'),
        message: t('toast.messages.errors.save_error', [t('squads.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
