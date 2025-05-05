import { defineStore } from 'pinia';

export const usePageLoaderStore = defineStore('loader', {
  state: () => {
    return {
      data: {
        isLoading: <boolean>false,
        message: <string>'',
      },
    };
  },

  getters: {
    getIsLoading: (state) => state.data.isLoading,
    getMessage: (state) => state.data.message,
  },

  actions: {
    showLoading(message?: string) {
      this.data.message = message !== undefined ? message : '';
      this.data.isLoading = true;
    },

    hideLoading() {
      this.data.isLoading = false;
      this.data.message = '';
    },
  },
});
