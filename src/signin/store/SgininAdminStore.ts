import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Signin } from '../domain/Signin';
import { defaultSigninFilters, type SigninFilters } from '../domain/SigninFilters';
import { defaultSigninTable, type SigninTable } from '../domain/SigninTable';

export const useSigninAdminStore = defineStore('signinAdmin', {
  state: () => {
    return {
      data: {
        table: <SigninTable>{ ...defaultSigninTable },
        tableFilters: <SigninFilters>UtilBase.cloneVueProxy(defaultSigninFilters),
        selectedToEdit: <Signin | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionSignin: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.lazyParams.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: SigninTable) {
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
    setSelectedToEdit(signin: Signin) {
      this.data.selectedToEdit = signin;
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
    setSigninState(signinState: number | null) {
      this.data.tableFilters.signinState = signinState;
    },
    cleanFilters() {
      this.data.tableFilters = UtilBase.cloneVueProxy(defaultSigninFilters);
    },
  },
});
