import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultBlogAdminTable, type BlogAdminTable } from '@/publication/domain/BlogAdminTable';
import type { Publication } from '@/publication/domain/Publication';
import type { Signin } from '../domain/Signin';
import { defaultSigninTable, type SigninTable } from '../domain/SigninTable';

export const useSigninAdminStore = defineStore('signinAdmin', {
  state: () => {
    return {
      data: {
        table: <SigninTable>{ ...defaultSigninTable },
        tableFilters: <Pageable>{ ...pageableDefault },
        selectedToEdit: <Signin | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionSignin: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: SigninTable) {
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
    setSelectedToEdit(user: Signin) {
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
