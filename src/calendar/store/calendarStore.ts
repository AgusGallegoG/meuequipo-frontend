import type { Game } from '@/shared/dominio/Game';
import { defaultCalendarFilter, type CalendarFilter } from '../domain/CalendarFilters';

export const useCalendarStore = defineStore('calendar', {
  state: () => {
    return {
      data: {
        list: <Game[]>[],
        filters: <CalendarFilter>{ ...defaultCalendarFilter },
        selectedToEdit: <Game | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionGame: (state) => state.data.selectedToEdit,
    getList: (state) => state.data.list,
    getFilters: (state) => state.data.filters,
  },

  actions: {
    setList(data: Game[]) {
      this.data.list = [...data];
    },
    setSelectedToEdit(game: Game) {
      this.data.selectedToEdit = { ...game };
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
