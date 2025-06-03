import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Rival } from '@/rivals/domain/RivalTable';
import responseRivalDetailsMock from '@/rivals/infrastructure/mocks/responseRivalDetailsMock.json';
import type { ResponseRival } from '../models/responses/ResponseRival';
import { mapResponseRivalToRival } from '../services/rivalsService';

async function Api(id: number): Promise<ResponseRival> {
  const response = await api.get<ResponseRival>(`/rivals/${id}`);

  return response.data;
}

async function InMemory(): Promise<ResponseRival> {
  await UtilBase.wait(500);
  return responseRivalDetailsMock as ResponseRival;
} //Devolver el mock

async function getRivalDetails(id: number): Promise<Rival> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(id);

    return mapResponseRivalToRival(response); // Mapear a Rival
  } catch (error) {
    throw new Error(`Error saving new event: ${id}`);
  }
}

export { getRivalDetails };
