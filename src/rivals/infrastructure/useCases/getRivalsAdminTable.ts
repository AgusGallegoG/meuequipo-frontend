import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { RivalFilters } from '@/rivals/domain/RivalFilters';
import type { RivalTable } from '@/rivals/domain/RivalTable';
import responseRivalAdminTable from '@/rivals/infrastructure/mocks/responseRivalAdminTable.json';
import type { ResponseRivalItem } from '@/rivals/infrastructure/models/responses/ResponseRivalTable';
import { mapPageableResponseToRivalsTable } from '../services/rivalsService';

const keysMap = {
  name: 'name',
};

async function Api(tableFilters: RivalFilters): Promise<PageableResponse<ResponseRivalItem>> {
  const response = await api.get<PageableResponse<ResponseRivalItem>>('/rivals', {
    params: createPageParams(tableFilters.pageParams, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseRivalItem>> {
  await UtilBase.wait(500);
  return responseRivalAdminTable as PageableResponse<ResponseRivalItem>;
} //Devolver el mock

async function getRivalsAdminTable(tableFilters: RivalFilters): Promise<RivalTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(tableFilters);
    return mapPageableResponseToRivalsTable(response); // Mapear a RivalTable
  } catch (error) {
    throw new Error(`Error fetching data of rivals table`);
  }
}

export { getRivalsAdminTable };
