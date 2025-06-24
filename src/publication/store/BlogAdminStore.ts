import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultBlogAdminTable, type BlogAdminTable } from '@/publication/domain/BlogAdminTable';
import type { Publication } from '@/publication/domain/Publication';

export const useBlogAdminStore = defineStore('blogAdmin', {
  state: () => {
    return {
      data: {
        table: <BlogAdminTable>{ ...defaultBlogAdminTable },
        tableFilters: <Pageable>UtilBase.cloneVueProxy(pageableDefault),
        selectedToEdit: <Publication | null>null,
      },
    };
  },

  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionPublication: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
    getTotalElements: (state) => state.data.table.totalRecords,
    getRows: (state) => state.data.tableFilters.rows,
    getFilters: (state) => state.data.tableFilters,
  },

  actions: {
    setTableData(data: BlogAdminTable) {
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
    setSelectedToEdit(user: Publication) {
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
