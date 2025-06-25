import { mapToLocaleDateTimeString, parseBackendDate } from '@/core/utilities/UtilDate';
import { defaultGameTeam, type Game, type GameTeam } from '@/shared/dominio/Game';
import type {
  RequestGame,
  RequestGameTeam,
} from '@/shared/infrastructure/models/requests/RequestGame';
import type {
  ResponseGame,
  ResponseGameTeam,
} from '@/shared/infrastructure/models/responses/ResponseGame';
import { mapResponseImageToImageView } from '@/shared/infrastructure/service/imageService';
import { mapResponseViewSquadToViewSquad } from '@/squad/infrastructure/services/squadService';

export function mapResponseGameToGame(response: ResponseGame): Game {
  return {
    id: response.id,
    category: response.category,
    localTeam: mapResponseGameTeamToGameTeam(response.localTeam),
    localPoints: response.localPoints,
    visitorTeam: mapResponseGameTeamToGameTeam(response.visitorTeam),
    visitorPoints: response.visitorPoints,
    gameDate: parseBackendDate(response.gameDate),
    state: response.state,
    location: response.location,
    squad: response.squad ? mapResponseViewSquadToViewSquad(response.squad) : null,
  };
}

export function mapResponseGameTeamToGameTeam(response: ResponseGameTeam): GameTeam {
  return {
    id: response.id,
    logo: response.logo ? mapResponseImageToImageView(response.logo) : null,
    name: response.name,
    isOurTeam: response.isOurTeam,
  };
}

export function mapResponseGameListToGameList(list: ResponseGame[]): Game[] {
  return list.map(mapResponseGameToGame);
}

export function mapResponseGameTeamListToGameTeamList(list: ResponseGameTeam[]): GameTeam[] {
  return list.map(mapResponseGameTeamToGameTeam);
}

export function mapGameToRequestGame(game: Game): RequestGame {
  return {
    category: game.category ?? null,
    id: game.id !== -1 ? game.id : null,
    localTeam: game.localTeam
      ? mapGameTeamToRequestGameTeam(game.localTeam)
      : { ...defaultGameTeam },
    visitorTeam: game.visitorTeam
      ? mapGameTeamToRequestGameTeam(game.visitorTeam)
      : { ...defaultGameTeam },
    localPoints: game.localPoints ?? null,
    visitorPoints: game.visitorPoints ?? null,
    location: game.location,
    gameDate: game.gameDate
      ? mapToLocaleDateTimeString(game.gameDate)
      : mapToLocaleDateTimeString(new Date()),
    state: game.state !== -1 ? game.state : null,
  };
}

export function mapGameTeamToRequestGameTeam(team: GameTeam): RequestGameTeam {
  return {
    id: team.id !== -1 ? team.id : null,
    isOurTeam: team.isOurTeam,
  };
}
