import { Roles } from '@/auth/domain/Roles';
import { useAuthStore } from '@/auth/store/authStore';
import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import { mapCalendarFiltersToRequestCalendarFilters } from '@/calendar/infrastructure/services/calendarService';
import { getMatchesList } from '@/calendar/infrastructure/useCases/getMatchesList';
import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';

export function useGetMatchesList() {
  const loading = ref<boolean>(false);
  const authStore = useAuthStore();
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(filters: CalendarFilter) {
    loading.value = true;
    try {
      return await getMatchesList(
        mapCalendarFiltersToRequestCalendarFilters(filters),
        authStore.hasRole(Roles.ADMIN)
      );
    } catch (error) {
      if (authStore.hasRole(Roles.ADMIN)) {
        showToast({
          title: t('matches.title'),
          message: t('toast.messages.errors.fetch_error', [t('matches.title')]),
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
