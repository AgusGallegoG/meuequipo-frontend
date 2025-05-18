import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Season } from '@/season/domain/Season';
import responseSeasonMock from '@/season/infrastructure/mocks/responseSeasonMock.json';
import type { RequestNewSeason } from '@/season/infrastructure/model/request/RequestNewSeason';
import type { ResponseSeasonList } from '@/season/infrastructure/model/response/ResponseSeasonList';
import { createSeasonListFromResponseSeasonList } from '@/season/infrastructure/service/seasonService';

async function InMemory(): Promise<ResponseSeasonList> {
  await UtilBase.wait(750);
  return responseSeasonMock as ResponseSeasonList;
}

async function Api(newSeason: RequestNewSeason): Promise<ResponseSeasonList> {
  const response = await api.post<ResponseSeasonList>('/season', newSeason);
  return response.data;
}

async function createSeason(newSeason: RequestNewSeason): Promise<Season[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(newSeason);
    return createSeasonListFromResponseSeasonList(response);
  } catch (error) {
    throw new Error(`Error fetching seasons`);
  }
}

export { createSeason };
