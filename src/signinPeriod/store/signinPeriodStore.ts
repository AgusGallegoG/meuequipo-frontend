import type { ResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import { defaultSigninPeriod, type SigninPeriod } from '@/signinPeriod/domain/SigninPeriod';

export const useSigninPeriodStore = defineStore('digninPeriodAdmin', {
  state: () => {
    return {
      data: {
        sigininPeriod: <SigninPeriod>{ ...defaultSigninPeriod },
        downloads: <number>0,
        hasForm: <boolean>false,
        isActive: <boolean>false,
      },
    };
  },
  getters: {
    downloads: (state) => state.data.downloads,
    hasForm: (state) => state.data.hasForm,
    isActive: (state) => state.data.isActive,
    signinPeriod: (state) => state.data.sigininPeriod,
  },

  actions: {
    setData(data: ResponseSigninData) {
      this.data.sigininPeriod = { id: data.id, dateInit: data.dateInit, dateEnd: data.dateEnd };
      this.data.downloads = data.downloads;
      this.data.hasForm = data.hasForm;
      this.data.isActive = data.isActive;
    },
    clearData() {
      this.data.downloads = 0;
      this.data.hasForm = false;
      this.data.isActive = false;
      this.data.sigininPeriod = { ...defaultSigninPeriod };
    },
  },
});
