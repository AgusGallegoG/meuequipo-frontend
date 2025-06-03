import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Select } from '@/shared/dominio/Select';
import categorySelectMock from '@/shared/infrastructure/mocks/categorySelectMock.json';
import { type ResponseSelect } from '../infrastructure/models/ResponseSelect';

// Ira evolucionando a medida que se creen/necesiten nuevos enums

export const useSharedDropdownsStore = defineStore('sharedDropdowns', {
  state: () => {
    return {
      data: {
        categories: <Select[]>[],
      },
    };
  },

  getters: {
    getCategories: (state) => state.data.categories,
    getCategoryName:
      (state) =>
      (id: number): string => {
        const category = state.data.categories.find((c) => c.id === id);
        return category ? category.name : '';
      },
  },

  // Store de dropdowns se hacen llamdas a back directas
  actions: {
    async fetchCategories() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = categorySelectMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/category/dropdown');
        res = partial.data;
      }
      this.data.categories = res;
    },
  },
});
