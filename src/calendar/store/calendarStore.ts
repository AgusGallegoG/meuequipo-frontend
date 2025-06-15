import type { Match } from '@/shared/dominio/Match';
import { defaultCalendarFilter, type CalendarFilter } from '../domain/CalendarFilters';

export const useCalendarStore = defineStore('calendar', {
  state: () => {
    return {
      data: {
        list: <Match[]>[],
        filters: <CalendarFilter>{ ...defaultCalendarFilter },
        selectedToEdit: <Match | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionMatch: (state) => state.data.selectedToEdit,
    getList: (state) => state.data.list,
    getFilters: (state) => state.data.filters,
  },

  actions: {
    setList(data: Match[]) {
      this.data.list = [...data];
    },
    setSelectedToEdit(match: Match) {
      this.data.selectedToEdit = { ...match };
    },
    clearSelectedToEdit() {
      this.data.selectedToEdit = null;
    },
    setFilters(filters: CalendarFilter) {
      this.data.filters = { ...filters };
    },
    updateWeekRange(from: Date, to: Date) {
      this.data.filters = { ...this.data.filters, from, to };
    },
    resetFilters() {
      this.data.filters = { ...defaultCalendarFilter };
    },
  },
});
