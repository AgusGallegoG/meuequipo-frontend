import type { Season } from '@/season/domain/Season';
import type { SeasonForm } from '@/season/domain/SeasonForm';
import type { RequestNewSeason } from '../model/request/RequestNewSeason';
import type { ResponseSeason, ResponseSeasonList } from '../model/response/ResponseSeasonList';

export function mapResponseSeasonToSeason(responseSea: ResponseSeason): Season {
  return {
    id: responseSea.id,
    active: responseSea.active,
    name: responseSea.name,
  };
}

export function createSeasonListFromResponseSeasonList(response: ResponseSeasonList): Season[] {
  return response.content.map(mapResponseSeasonToSeason);
}

export function createRequestNewSeasonFromSeasonForm(newSeason: SeasonForm): RequestNewSeason {
  return {
    startDate: newSeason.startDate.toISOString(),
    endDate: newSeason.endDate.toISOString(),
    active: newSeason.active,
  };
}
