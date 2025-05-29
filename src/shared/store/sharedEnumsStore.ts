import type { Select } from '@/shared/dominio/Select';

// Ira evolucionando a medida que se creen/necesiten nuevos enums

export const useSharedEnumsStore = defineStore('sharedEnums', {
  state: () => {
    return {
      data: {
        category: <Select[]>[],
      },
    };
  },

  getters: {
    getCategory: (state) => state.data.category,
    getCategoryTName:
      (state) =>
      (id: number): string => {
        const category = state.data.category.find((c) => c.id === id);
        return category ? category.name : '';
      },
  },

  actions: {
    load(categoryTypes: Select[]) {
      this.data.category = categoryTypes;
    },
  },
});
