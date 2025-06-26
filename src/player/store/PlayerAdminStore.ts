import { UtilBase } from '@/core/utilities/UtilBase';
import type { Player } from '@/player/domain/Player';
import { defaultPlayerFilters, type PlayerFilter } from '@/player/domain/PlayerFilter';
import { defaultPlayerTable, type PlayerTable } from '@/player/domain/PlayerTable';

export const usePlayerAdminStore = defineStore('playerAdmin', {
  state: () => {
    return {
      data: {
        table: <PlayerTable>{ ...defaultPlayerTable },
        tableFilters: <PlayerFilter>UtilBase.cloneVueProxy(defaultPlayerFilters),
        selectedToEdit: <Player | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionPlayer: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.lazyParams.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: PlayerTable) {
      this.data.table = { ...data };
    },
    setSort(field: string, direction: number) {
      if (this.data.tableFilters) {
        this.data.tableFilters.lazyParams.sortField = UtilBase.isNullOrEmpty(field) ? [] : [field];
        this.data.tableFilters.lazyParams.sortOrder = direction;
      }
    },
    setPage(page: number) {
      if (this.data.tableFilters) {
        this.data.tableFilters.lazyParams.page = page;
      }
    },
    setSelectedToEdit(player: Player) {
      this.data.selectedToEdit = player;
    },
    clearSelectedToEdit() {
      this.data.selectedToEdit = null;
    },
    clearSort() {
      if (this.data.tableFilters) {
        this.data.tableFilters.lazyParams.sortField = null;
        this.data.tableFilters.lazyParams.sortOrder = null;
      }
    },
    setCategory(categoryId: number | null) {
      this.data.tableFilters.categoryId = categoryId;
    },
    setPlayerSex(sexId: number | null) {
      this.data.tableFilters.sex = sexId;
    },
    cleanFilters() {
      this.data.tableFilters = UtilBase.cloneVueProxy(defaultPlayerFilters);
    },
  },
});
