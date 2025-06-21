import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { RivalFilters } from '@/rivals/domain/RivalFilters';
import responseRivalAdminTable from '@/rivals/infrastructure/mocks/responseRivalAdminTable.json';
import type { RequestSaveRival } from '@/rivals/infrastructure/models/requests/RequestSaveRival';
import type { ResponseRivalItem } from '@/rivals/infrastructure/models/responses/ResponseRivalTable';
import { mapPageableResponseToRivalsTable } from '@/rivals/infrastructure/services/rivalsService';

const keysMap = {
  name: 'name',
};

async function Api(
  rival: RequestSaveRival,
  pageable: RivalFilters
): Promise<PageableResponse<ResponseRivalItem>> {
  const response = await api.post<PageableResponse<ResponseRivalItem>>('/rivals', rival, {
    params: createPageParams(pageable.pageParams, keysMap),
  });
  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseRivalItem>> {
  await UtilBase.wait(500);
  return responseRivalAdminTable as PageableResponse<ResponseRivalItem>;
}
async function saveRival(rival: RequestSaveRival, pageable: RivalFilters) {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(rival, pageable);
    return mapPageableResponseToRivalsTable(response); // Mapear a RivalTable
  } catch (error) {
    throw new Error(`Error saving/updating new Rival`);
  }
}

export { saveRival };
