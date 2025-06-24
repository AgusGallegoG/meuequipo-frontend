import responseMatchListMock from '@/calendar/infrastructure/mocks/responseMatchListMock.json';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Match } from '@/shared/dominio/Match';
import type { RequestMatch } from '@/shared/infrastructure/models/requests/RequestMatch';
import type { ResponseMatch } from '@/shared/infrastructure/models/responses/ResponseMatch';
import { mapResponseMatchToMatch } from '@/shared/infrastructure/service/matchService';

async function Api(match: RequestMatch): Promise<ResponseMatch> {
  const response = await api.post<ResponseMatch>('/calendars/match', match);

  return response.data;
}

async function InMemory(): Promise<ResponseMatch> {
  await UtilBase.wait(500);

  return responseMatchListMock[0] as ResponseMatch;
}

async function saveMatch(match: RequestMatch): Promise<Match> {
  try {
    debugger;
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(match);

    return mapResponseMatchToMatch(response);
  } catch (error) {
    throw new Error(`Error saving/updating match from calendarAdmin`);
  }
}

export { saveMatch };
