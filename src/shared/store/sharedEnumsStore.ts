import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Select } from '@/shared/dominio/Select';
import categorySelectMock from '@/shared/infrastructure/mocks/categorySelectMock.json';
import gameStatesMock from '@/shared/infrastructure/mocks/gameStatesMock.json';
import sexOptionsMock from '@/shared/infrastructure/mocks/sexOptionsMock.json';
import signinStatesMock from '@/shared/infrastructure/mocks/signinStatesMock.json';
import { type ResponseSelect } from '../infrastructure/models/responses/ResponseSelect';

// Ira evolucionando a medida que se creen/necesiten nuevos enums

export const useSharedEnumsStore = defineStore('sharedEnums', {
  state: () => {
    return {
      data: {
        categories: <Select[]>[],
        sexOptions: <Select[]>[],
        sexPlayersOptions: <Select[]>[],
        signinStates: <Select[]>[],
        gameStates: <Select[]>[],
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
    getSexOptions: (state) => state.data.sexOptions,
    getSexName:
      (state) =>
      (id: number): string => {
        const sex = state.data.sexOptions.find((c) => c.id === id);
        return sex ? sex.name : '';
      },
    getSexSeverity:
      (state) =>
      (id: number): string => {
        const sex = state.data.sexPlayersOptions.find((c) => c.id === id);
        if (!sex) return '';

        const name = sex.name.toUpperCase();

        if (name === 'MASCULINO') {
          return 'info';
        }
        if (name === 'FEMENINO' || name === 'FEMININO') return 'warn';
        if (name === 'MIXTO') return 'success';

        return '';
      },

    getSexPlayersOptions: (state) => state.data.sexPlayersOptions,
    getSexPlayersName:
      (state) =>
      (id: number): string => {
        const sex = state.data.sexPlayersOptions.find((c) => c.id === id);
        return sex ? sex.name : '';
      },
    getSexPlayersSeverity:
      (state) =>
      (id: number): string => {
        const sex = state.data.sexPlayersOptions.find((c) => c.id === id);
        if (!sex) return '';

        const name = sex.name.toUpperCase();

        if (name === 'HOME') {
          return 'info';
        }
        if (name === 'MULLER') return 'warn';

        return '';
      },
    getSigninStates: (state) => state.data.signinStates,
    getSigninStateName:
      (state) =>
      (id: number): string => {
        const stateOp = state.data.signinStates.find((c) => c.id === id);
        return stateOp ? stateOp.name : '';
      },

    getGameStates: (state) => state.data.gameStates,
    getGameStatesName:
      (state) =>
      (id: number): string => {
        const stateOp = state.data.gameStates.find((c) => c.id === id);
        return stateOp ? stateOp.name : '';
      },
  },

  // Store de dropdowns se hacen llamdas a back directas
  actions: {
    async fetchAll() {
      await this.fetchCategories();
      await this.fetchSexOptions();
      await this.fetchSigninStateOptions();
      await this.fetchGameStatesOptions();
      await this.fetchSexPlayersOptions();
    },
    async fetchCategories() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = categorySelectMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/category/public/dropdown');
        res = partial.data;
      }
      this.data.categories = res;
    },

    async fetchSexOptions() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = sexOptionsMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/enums/sex');
        res = partial.data;
      }
      this.data.sexOptions = res;
    },

    async fetchSexPlayersOptions() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = sexOptionsMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/enums/sexPlayers');
        res = partial.data;
      }
      this.data.sexPlayersOptions = res;
    },

    async fetchSigninStateOptions() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = signinStatesMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/enums/signinState');
        res = partial.data;
      }
      this.data.signinStates = res;
    },

    async fetchGameStatesOptions() {
      var res: Select[] = [];
      if (UtilBase.checkEnvironment()) {
        await UtilBase.wait(100);
        res = gameStatesMock.content as ResponseSelect[];
      } else {
        const partial = await api.get<ResponseSelect[]>('/enums/gameStates');
        res = partial.data;
      }
      this.data.gameStates = res;
    },
  },
});
