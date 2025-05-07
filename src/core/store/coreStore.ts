import { type Core, defaultCore } from '@/core/dominio/Core';
import { defineStore } from 'pinia';

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
