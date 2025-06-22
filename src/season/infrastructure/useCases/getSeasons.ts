import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Season } from '@/season/domain/Season';
import responseSeasonMock from '@/season/infrastructure/mocks/responseSeasonMock.json';
import type { ResponseSeason } from '@/season/infrastructure/model/response/ResponseSeasonList';
import { createSeasonListFromResponseSeasonList } from '@/season/infrastructure/service/seasonService';

async function InMemory(): Promise<ResponseSeason[]> {
  await UtilBase.wait(750);
  return responseSeasonMock.content as ResponseSeason[];
}

async function Api(): Promise<ResponseSeason[]> {
  const response = await api.get<ResponseSeason[]>('/season/all');
  return response.data;
}

async function getSeasons(): Promise<Season[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return createSeasonListFromResponseSeasonList(response);
  } catch (error) {
    throw new Error(`Error fetching seasons`);
  }
}

export { getSeasons };
