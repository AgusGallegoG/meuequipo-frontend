import { mapToLocaleDateTimeString, parseBackendDate } from '@/core/utilities/UtilDate';
import { defaultMatchTeam, type Match, type MatchTeam } from '@/shared/dominio/Match';
import type {
  RequestMatch,
  RequestMatchTeam,
} from '@/shared/infrastructure/models/requests/RequestMatch';
import type {
  ResponseMatch,
  ResponseMatchTeam,
} from '@/shared/infrastructure/models/responses/ResponseMatch';
import { mapResponseImageToImageView } from '@/shared/infrastructure/service/imageService';

export function mapResponseMatchToMatch(response: ResponseMatch): Match {
  return {
    id: response.id,
    category: response.category,
    localTeam: mapResponseMatchTeamToMatchTeam(response.localTeam),
    localPoints: response.localPoints,
    visitorTeam: mapResponseMatchTeamToMatchTeam(response.visitorTeam),
    visitorPoints: response.visitorPoints,
    matchDate: parseBackendDate(response.matchDate),
    state: response.state,
    location: response.location,
  };
}

export function mapResponseMatchTeamToMatchTeam(response: ResponseMatchTeam): MatchTeam {
  return {
    id: response.id,
    logo: response.logo ? mapResponseImageToImageView(response.logo) : null,
    name: response.name,
    isOurTeam: response.isOurTeam,
  };
}

export function mapResponseMatchListToMatchList(list: ResponseMatch[]): Match[] {
  return list.map(mapResponseMatchToMatch);
}

export function mapResponseMatchTeamListToMatchTeamList(list: ResponseMatchTeam[]): MatchTeam[] {
  return list.map(mapResponseMatchTeamToMatchTeam);
}

export function mapMatchToRequestMatch(match: Match): RequestMatch {
  return {
    category: match.category ?? null,
    id: match.id !== -1 ? match.id : null,
    localTeam: match.localTeam
      ? mapMatchTeamToRequestMatchTeam(match.localTeam)
      : { ...defaultMatchTeam },
    visitorTeam: match.visitorTeam
      ? mapMatchTeamToRequestMatchTeam(match.visitorTeam)
      : { ...defaultMatchTeam },
    localPoints: match.localPoints ?? null,
    visitorPoints: match.visitorPoints ?? null,
    location: match.location,
    matchDate: match.matchDate
      ? mapToLocaleDateTimeString(match.matchDate)
      : mapToLocaleDateTimeString(new Date()),
    state: match.state !== -1 ? match.state : null,
  };
}

export function mapMatchTeamToRequestMatchTeam(team: MatchTeam): RequestMatchTeam {
  return {
    id: team.id !== -1 ? team.id : null,
    isOurTeam: team.isOurTeam,
  };
}
