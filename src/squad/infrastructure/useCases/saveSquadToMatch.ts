import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { ViewSquad } from '@/squad/domain/ViewSquad';
import responseViewSquadMock from '@/squad/infrastructure/mocks/responseViewSquadMock.json';
import type { RequestSaveSquad } from '@/squad/infrastructure/models/requests/RequestSaveSquad';
import type { ResponseViewSquad } from '@/squad/infrastructure/models/responses/ResponseViewSquad';
import { mapResponseViewSquadToViewSquad } from '@/squad/infrastructure/services/squadService';

async function Api(req: RequestSaveSquad): Promise<ResponseViewSquad> {
  const response = await api.post<ResponseViewSquad>('calendars/match/squad', req);
  return response.data;
}

async function InMemory(): Promise<ResponseViewSquad> {
  await UtilBase.wait(500);
  return responseViewSquadMock as ResponseViewSquad;
  // return {} as ResponseViewSquad;
}

async function saveSquadToMatch(req: RequestSaveSquad): Promise<ViewSquad> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(req);

    return mapResponseViewSquadToViewSquad(response);
  } catch (error) {
    throw new Error(`Error saving squad`);
  }
}

export { saveSquadToMatch };
