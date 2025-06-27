import { useMeToast } from '@/core/hooks/useMeToast';
import type { Player } from '@/player/domain/Player';
import { mapPlayerToRequestPlayer } from '@/player/infrastructure/service/playerService';
import { savePlayer } from '@/player/infrastructure/useCases/savePlayer';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';

export function useSavePlayer() {
  const { t } = useI18n();
  const { showToast } = useMeToast();
  const loading = ref<boolean>(false);

  async function refetch(player: Player) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await savePlayer(mapPlayerToRequestPlayer(player));
      });
      showToast({
        title: t('player.title'),
        message: t('toast.messages.success.save_success', [
          ' o ' + t('player.title').toLowerCase(),
        ]),
        severity: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: t('player.title'),
        message: t('toast.messages.errors.save_error', [t('player.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { refetch, loading };
}
