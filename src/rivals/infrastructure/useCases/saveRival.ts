import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { RivalItem } from '@/rivals/domain/RivalTable';
import responseRivalAdminTable from '@/rivals/infrastructure/mocks/responseRivalAdminTable.json';
import type { RequestSaveRival } from '@/rivals/infrastructure/models/requests/RequestSaveRival';
import type { ResponseRivalItem } from '@/rivals/infrastructure/models/responses/ResponseRivalTable';
import { mapResponseRivalItemToRivalItem } from '@/rivals/infrastructure/services/rivalsService';

async function Api(rival: RequestSaveRival): Promise<ResponseRivalItem> {
  const response = await api.post<ResponseRivalItem>('/rivals', rival);
  return response.data;
}

async function InMemory(): Promise<ResponseRivalItem> {
  await UtilBase.wait(500);
  return responseRivalAdminTable.content[0] as ResponseRivalItem;
}
async function saveRival(rival: RequestSaveRival): Promise<RivalItem> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(rival);
    return mapResponseRivalItemToRivalItem(response);
  } catch (error) {
    throw new Error(`Error saving/updating new Rival`);
  }
}

export { saveRival };
