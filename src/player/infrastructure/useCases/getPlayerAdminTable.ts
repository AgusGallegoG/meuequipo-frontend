import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { PlayerFilter } from '@/player/domain/PlayerFilter';
import type { PlayerTable } from '@/player/domain/PlayerTable';
import responsePlayerTableMock from '@/player/infrastructure/mocks/responsePlayerTableMock.json';
import type { ResponsePlayer } from '@/player/infrastructure/models/responses/ResponsePlayer';
import { mapPageableResponseToPlayer } from '@/player/infrastructure/service/playerService';

const keysMap = {
  category: 'category',
};

async function Api(filters: PlayerFilter): Promise<PageableResponse<ResponsePlayer>> {
  const response = await api.get<PageableResponse<ResponsePlayer>>('players/admin', {
    params: {
      ...createPageParams(filters.lazyParams, keysMap),
      categoryId: filters.categoryId,
      sex: filters.sex,
    },
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponsePlayer>> {
  await UtilBase.wait(500);

  return responsePlayerTableMock as PageableResponse<ResponsePlayer>;
}

async function getPlayerAdminTable(filters: PlayerFilter): Promise<PlayerTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(filters);

    return mapPageableResponseToPlayer(response);
  } catch (error) {
    throw new Error(`Error fetching playerAdminTable data`);
  }
}

export { getPlayerAdminTable };
