import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultRivalFilters, type RivalFilters } from '@/rivals/domain/RivalFilters';
import { defaultRivalTable, type Rival, type RivalTable } from '@/rivals/domain/RivalTable';

export const useRivalsAdminStore = defineStore('rivalsAdmin', {
  state: () => {
    return {
      data: {
        table: <RivalTable>{ ...defaultRivalTable },
        tableFilters: <RivalFilters>{ ...defaultRivalFilters },
        selectedToEdit: <Rival | null>null,
      },
    };
  },
  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionRival: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.pageParams.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: RivalTable) {
      this.data.table = { ...data };
    },
    setSort(field: string, direction: number) {
      if (this.data.tableFilters) {
        (this.data.tableFilters.pageParams.sortField = UtilBase.isNullOrEmpty(field)
          ? []
          : [field]),
          (this.data.tableFilters.pageParams.sortOrder = direction);
      }
    },
    setPage(page: number) {
      if (this.data.tableFilters.pageParams) {
        this.data.tableFilters.pageParams.page = page;
      }
    },
    setSelectedToEdit(rival: Rival) {
      this.data.selectedToEdit = rival;
    },
    clearSelectedToEdit() {
      this.data.selectedToEdit = null;
    },
    clearSort() {
      if (this.data.tableFilters) {
        this.data.tableFilters.pageParams.sortField = null;
        this.data.tableFilters.pageParams.sortOrder = null;
      }
    },
  },
});
