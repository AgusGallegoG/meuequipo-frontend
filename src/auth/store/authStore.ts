import type { Roles } from '@/auth/domain/Roles';
import type { User } from '@/auth/domain/User';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      data: {
        completeName: <string>'',
        email: <string>'',
        authorities: <string[]>[],
        token: <string>'',
      },
    };
  },

  getters: {
    getUsername: (state) => state.data.completeName,
    getEmail: (state) => state.data.email,
    getToken: (state) => state.data.token,
    hasRole: (state) => (role: Roles) => state.data.authorities.includes(role),
  },

  actions: {
    setData(user: User) {
      this.data.completeName = user.completeName;
      this.data.email = user.email;
      this.data.authorities = user.authorities;
      this.data.token = user.token;
    },

    clearData() {
      this.data.completeName = '';
      this.data.email = '';
      this.data.authorities = [];
      this.data.token = '';
    },

    async validateToken() {
      return UtilBase.checkEnvironment() ? true : await api.get('auth/validate');
    },
  },

  persist: true,
});
