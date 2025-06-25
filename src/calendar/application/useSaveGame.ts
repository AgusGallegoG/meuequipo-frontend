import { saveGame } from '@/calendar/infrastructure/useCases/saveGame';
import { useMeToast } from '@/core/hooks/useMeToast';
import type { Game } from '@/shared/dominio/Game';
import { mapGameToRequestGame } from '@/shared/infrastructure/service/gameService';
import { withLoading } from '@/shared/utils/withLoading';
import { useI18n } from 'vue-i18n';

export function useSaveGame() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(game: Game) {
    loading.value = true;
    try {
      const response = await withLoading(async () => {
        return await saveGame(mapGameToRequestGame(game));
      });
      showToast({
        title: t('games.title'),
        message: t('toast.messages.success.save_success', [' o ' + t('games.title').toLowerCase()]),
        severity: 'success',
      });

      return response;
    } catch (error) {
      showToast({
        title: t('games.title'),
        message: t('toast.messages.errors.save_error', [t('games.title').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
