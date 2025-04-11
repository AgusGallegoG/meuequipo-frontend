import { defineStore } from 'pinia';
import { type Core, defaultCore } from '@/core/dominio/Core';

export const useCoreStore = defineStore('core', {
  state: () => {
    return {
      data: <Core>{ ...defaultCore },
    };
  },
  actions: {
    openLeftMenu() {
      this.data.menuLeftHidden = false;
    },
  },
});
