import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import type { RequestCalendarFilters } from '@/calendar/infrastructure/models/RequestCalendarFilters';
import { mapToLocaleDateString } from '@/core/utilities/UtilDate';

export function mapCalendarFiltersToRequestCalendarFilters(
  filters: CalendarFilter
): RequestCalendarFilters {
  return {
    from: filters.from ? mapToLocaleDateString(filters.from) : null,
    to: filters.to ? mapToLocaleDateString(filters.to) : null,
    team: filters.team,
  };
}
