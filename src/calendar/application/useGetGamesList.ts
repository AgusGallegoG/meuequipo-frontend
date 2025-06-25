import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import { mapCalendarFiltersToRequestCalendarFilters } from '@/calendar/infrastructure/services/calendarService';
import { getGamesList } from '@/calendar/infrastructure/useCases/getGamesList';
import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';

export function useGetGamesList() {
  const loading = ref<boolean>(false);
  const authStore = useAuthStore();
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(filters: CalendarFilter, isSquad: boolean) {
    loading.value = true;
    try {
      return await getGamesList(
        mapCalendarFiltersToRequestCalendarFilters(filters),
        authStore.hasRole(Roles.ADMIN),
        isSquad
      );
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('games.title'),
          message: t('toast.messages.errors.fetch_error', [t('games.title')]),
          severity: 'warn',
        });
      }
      return [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
