import { UtilBase } from '@/core/utilities/UtilBase';
import { defaultMatch, defaultMatchTeam, type Match, type MatchTeam } from '@/shared/dominio/Match';
import type { Squad } from '../domain/Squad';

export const useSquadStepperAdminStore = defineStore('squadStepperAdmin', {
  state: () => {
    return {
      data: {
        team: <number>-1,
        match: <Match>{ ...defaultMatch },
        players: <number[]>[],
        location: <string>'',
        date: <Date | null>null,
        notification: <string>'',
        sendMail: <boolean>true,
      },
    };
  },
  getters: {
    squad(state): Squad {
      return {
        team: state.data.team,
        match: state.data.match.id,
        players: state.data.players,
        location: state.data.location,
        dateHour: state.data.date,
        sendMail: state.data.sendMail,
        mailText: state.data.notification,
      };
    },
    team(state): number {
      return state.data.team;
    },
    matchInfo:
      (state) =>
      (idTeam: number = state.data.team) => {
        const bothOurs =
          state.data.match.localTeam?.isOurTeam && state.data.match.visitorTeam?.isOurTeam;

        var rivalTeamName: string | null = null;
        if (!bothOurs) {
          rivalTeamName = state.data.match.localTeam?.isOurTeam
            ? (state.data.match.visitorTeam?.name ?? null)
            : (state.data.match.localTeam?.name ?? null);
        } else {
          rivalTeamName =
            state.data.match.localTeam?.id === idTeam
              ? (state.data.match.visitorTeam?.name ?? null)
              : (state.data.match.localTeam?.name ?? null);
        }
        return {
          matchDate: state.data.match.matchDate,
          location: state.data.match.location,
          rival: rivalTeamName,
        };
      },
  },
  actions: {
    setDataStepOne(match: Match, team: number) {
      this.data.team = team;
      this.data.match = { ...match };
    },
    setDataStepTwo(players: number[]) {
      this.data.players = [...players];
    },
    setDataStepThree(location: string, date: Date | null, notification: string, send: boolean) {
      this.data.date = date;
      this.data.location = location;
      this.data.notification = notification;
      this.data.sendMail = send;
    },
    resetData() {
      this.data = {
        team: -1,
        match: UtilBase.cloneVueProxy(defaultMatch),
        date: null,
        location: '',
        notification: '',
        players: [],
        sendMail: true,
      };
    },
  },
});
