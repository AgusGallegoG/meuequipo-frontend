import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultGame, defaultGameTeam, type Game, type GameTeam } from '@/shared/dominio/Game';
import type { Squad } from '../domain/Squad';

export const useSquadStepperAdminStore = defineStore('squadStepperAdmin', {
  state: () => {
    return {
      data: {
        team: <number>-1,
        game: <Game>{ ...defaultGame },
        players: <number[]>[],
        location: <string>'',
        date: <Date | null>null,
      },
    };
  },
  getters: {
    squad(state): Squad {
      return {
        team: state.data.team,
        game: state.data.game.id,
        players: state.data.players,
        location: state.data.location,
        dateHour: state.data.date,
      };
    },
    team(state): number {
      return state.data.team;
    },
    gameInfo:
      (state) =>
      (idTeam: number = state.data.team) => {
        const bothOurs =
          state.data.game.localTeam?.isOurTeam && state.data.game.visitorTeam?.isOurTeam;

        var rivalTeamName: string | null = null;
        if (!bothOurs) {
          rivalTeamName = state.data.game.localTeam?.isOurTeam
            ? (state.data.game.visitorTeam?.name ?? null)
            : (state.data.game.localTeam?.name ?? null);
        } else {
          rivalTeamName =
            state.data.game.localTeam?.id === idTeam
              ? (state.data.game.visitorTeam?.name ?? null)
              : (state.data.game.localTeam?.name ?? null);
        }
        return {
          gameDate: state.data.game.gameDate,
          location: state.data.game.location,
          rival: rivalTeamName,
        };
      },
  },
  actions: {
    setDataStepOne(game: Game, team: number) {
      this.data.team = team;
      this.data.game = { ...game };
    },
    setDataStepTwo(players: number[]) {
      this.data.players = [...players];
    },
    setDataStepThree(location: string, date: Date | null) {
      this.data.date = date;
      this.data.location = location;
    },
    resetData() {
      this.data = {
        team: -1,
        game: UtilBase.cloneVueProxy(defaultGame),
        date: null,
        location: '',
        players: [],
      };
    },
  },
});
