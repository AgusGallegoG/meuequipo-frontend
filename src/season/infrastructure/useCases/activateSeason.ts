import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Season } from '@/season/domain/Season';
import responseSeasonMock from '@/season/infrastructure/mocks/responseSeasonMock.json';
import type { ResponseSeason } from '@/season/infrastructure/model/response/ResponseSeasonList';
import { createSeasonListFromResponseSeasonList } from '@/season/infrastructure/service/seasonService';

async function InMemory(newActive: Season): Promise<ResponseSeason[]> {
  await UtilBase.wait(3000);
  const allSeasons = responseSeasonMock.content as ResponseSeason[];
  //Para simular o correcto funcionamento,
  allSeasons.forEach((season) => {
    season.active = season.id === newActive.id;
  });

  return allSeasons;
}

async function Api(newActive: Season): Promise<ResponseSeason[]> {
  const response = await api.patch<ResponseSeason[]>('/season/' + newActive.id + '/activate');
  return response.data;
}

async function activateSeason(newActive: Season): Promise<Season[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory(newActive) : await Api(newActive);
    return createSeasonListFromResponseSeasonList(response);
  } catch (error) {
    throw new Error(`Error activating seasons`);
  }
}

export { activateSeason };
