import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import responseMatchListMock from '@/calendar/infrastructure/mocks/responseMatchListMock.json';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Match } from '@/shared/dominio/Match';
import type { ResponseMatch } from '@/shared/infrastructure/models/responses/ResponseMatch';
import { mapResponseMatchListToMatchList } from '@/shared/infrastructure/service/matchService';
import type { RequestCalendarFilters } from '../models/RequestCalendarFilters';

async function Api(filters: RequestCalendarFilters): Promise<ResponseMatch[]> {
  const repsonse = await api.get<ResponseMatch[]>('/calendars', {
    params: {
      filters,
    },
  });

  return repsonse.data;
}

async function InMemory(): Promise<ResponseMatch[]> {
  await UtilBase.wait(500);
  return responseMatchListMock as ResponseMatch[];
}

async function getMatchesList(filters: RequestCalendarFilters): Promise<Match[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(filters);

    return mapResponseMatchListToMatchList(response);
  } catch (error) {
    throw new Error(`Error fetching matches between dates or by teamId`);
  }
}

export { getMatchesList };
