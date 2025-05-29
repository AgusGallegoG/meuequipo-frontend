import {
  defaultCategoryTable,
  type CategoryItem,
  type CategoryTable,
} from '../domain/CategoryTable';

export const useCategoryStore = defineStore('CategoryAdmin', {
  state: () => {
    return {
      data: {
        table: <CategoryTable>{ ...defaultCategoryTable },
        selectedToEdit: <CategoryItem | null>null,
      },
    };
  },
  getters: {
    isEdition: (state) => state.data.selectedToEdit !== null,
    getEditionCategory: (state) => state.data.selectedToEdit,
    getTable: (state) => state.data.table.content,
  },

  actions: {
    setTableData(table: CategoryTable) {
      this.data.table = { ...table };
    },
    setSelectedToEdit(category: CategoryItem) {
      this.data.selectedToEdit = category;
    },
    clearSelectedToEdit() {
      this.data.selectedToEdit = null;
    },
  },
});
