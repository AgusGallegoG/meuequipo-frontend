import { defineStore } from 'pinia';

export const usePageLoadStore = defineStore('pageLoad', {
  state: (): {
    loading: boolean;
    text: string;
  } => ({
    loading: false,
    text: '',
  }),
  actions: {
    showPageLoad(message?: string) {
      this.text === message ? message : '';
      this.loading = true;
    },
    hiddenPageLoad() {
      this.loading = false;
      this.text = '';
    },
  },
});
