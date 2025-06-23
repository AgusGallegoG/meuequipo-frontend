import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Season } from '@/season/domain/Season';
import responseSeasonMock from '@/season/infrastructure/mocks/responseSeasonMock.json';
import type { RequestNewSeason } from '@/season/infrastructure/model/request/RequestNewSeason';
import type { ResponseSeason } from '@/season/infrastructure/model/response/ResponseSeasonList';
import { mapResponseSeasonToSeason } from '@/season/infrastructure/service/seasonService';

async function InMemory(): Promise<ResponseSeason> {
  await UtilBase.wait(750);
  return responseSeasonMock.content[0] as ResponseSeason;
}

async function Api(newSeason: RequestNewSeason): Promise<ResponseSeason> {
  const response = await api.post<ResponseSeason>('/season', newSeason);
  return response.data;
}

async function createSeason(newSeason: RequestNewSeason): Promise<Season> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(newSeason);
    return mapResponseSeasonToSeason(response);
  } catch (error) {
    throw new Error(`Error fetching seasons`);
  }
}

export { createSeason };
