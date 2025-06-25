import { mapToLocaleDateTimeString, parseBackendDate } from '@/core/utilities/UtilDate';
import type { Select } from '@/shared/dominio/Select';
import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';
import type { Squad } from '@/squad/domain/Squad';
import type { ViewSquad } from '@/squad/domain/ViewSquad';
import type { RequestSaveSquad } from '@/squad/infrastructure/models/requests/RequestSaveSquad';
import type { ResponseViewSquad } from '../models/responses/ResponseViewSquad';

export function mapSquadToRequestSaveSquad(squad: Squad): RequestSaveSquad {
  return {
    location: squad.location,
    mailText: squad.mailText,
    date: squad.dateHour ? mapToLocaleDateTimeString(squad.dateHour) : '',
    game: squad.game ?? -1,
    team: squad.team ?? -1,
    players: [...squad.players],
    sendMail: squad.sendMail,
  };
}

export function mapResponseViewSquadToViewSquad(resp: ResponseViewSquad): ViewSquad {
  return {
    id: resp.id,
    date: parseBackendDate(resp.date),
    location: resp.location,
    players: mapResponseSelectListToSelectList(resp.players),
  };
}

function mapResponseSelectListToSelectList(players: ResponseSelect[]): Select[] {
  return players.map(responseSelectToSelect);
}

function responseSelectToSelect(res: ResponseSelect): Select {
  return {
    id: res.id,
    name: res.name,
  };
}
