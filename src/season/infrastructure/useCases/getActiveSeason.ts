import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Season } from '@/season/domain/Season';
import responseActiveSeasonMock from '@/season/infrastructure/mocks/responseActiveSeasonMock.json';
import type { ResponseSeason } from '@/season/infrastructure/model/response/ResponseSeasonList';
import { mapResponseSeasonToSeason } from '@/season/infrastructure/service/seasonService';

async function InMemory(): Promise<ResponseSeason> {
  await UtilBase.wait(500);
  // throw new Error();
  return responseActiveSeasonMock as ResponseSeason;
}

async function Api(): Promise<ResponseSeason> {
  const response = await api.get<ResponseSeason>('/season/active');
  return response.data;
}

async function getActiveSeason(): Promise<Season> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return mapResponseSeasonToSeason(response);
  } catch (error) {
    throw new Error(`Error fetching active season`);
  }
}

export { getActiveSeason };
