import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamForm } from '@/team/domain/Team';
import { defaultTeamTable, type TeamTable } from '@/team/domain/TeamTable';

export const useTeamAdminStore = defineStore('teamAdmin', {
  state: () => {
    return {
      data: {
        table: <TeamTable>{ ...defaultTeamTable },
        tableFilters: <Pageable>{ ...pageableDefault },
        selectedToEdit: <TeamForm | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionTeam: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: TeamTable) {
      this.data.table = { ...data };
    },
    setSort(field: string, direction: number) {
      if (this.data.tableFilters) {
        this.data.tableFilters.sortField = UtilBase.isNullOrEmpty(field) ? [] : [field];
        this.data.tableFilters.sortOrder = direction;
      }
    },
    setPage(page: number) {
      if (this.data.tableFilters) {
        this.data.tableFilters.page = page;
      }
    },
    setSelectedToEdit(user: TeamForm) {
      this.data.selectedToEdit = user;
    },
    clearSelectedToEdit() {
      this.data.selectedToEdit = null;
    },
    clearSort() {
      if (this.data.tableFilters) {
        this.data.tableFilters.sortField = null;
        this.data.tableFilters.sortOrder = null;
      }
    },
  },
});
