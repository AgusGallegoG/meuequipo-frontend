import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultUserTable, type UserItem, type UserTable } from '@/user/domain/UserTable';
import { defineStore } from 'pinia';

export const useUserAdminStore = defineStore('userAdmin', {
  state: () => {
    return {
      data: {
        table: <UserTable>{ ...defaultUserTable },
        tableFilters: <Pageable>UtilBase.cloneVueProxy(pageableDefault),
        selectedToEdit: <UserItem | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionUser: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: UserTable) {
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
    setSelectedToEdit(user: UserItem) {
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
    cleanFilters() {
      this.data.tableFilters = UtilBase.cloneVueProxy(pageableDefault);
    },
  },
});
