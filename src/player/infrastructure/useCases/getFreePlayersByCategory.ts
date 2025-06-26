import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import responsePlayersSelectMock from '@/player/infrastructure/mocks/responsePlayersSelectMock.json';
import type { Select } from '@/shared/dominio/Select';
import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';

async function Api(categoryId: number): Promise<ResponseSelect[]> {
  const response = await api.get<ResponseSelect[]>(`/players/category/${categoryId}`);

  return response.data;
}

async function InMemory(): Promise<ResponseSelect[]> {
  await UtilBase.wait(500);
  return responsePlayersSelectMock.content as ResponseSelect[];
}

async function getFreePlayersByCategory(categoryId: number): Promise<Select[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(categoryId);

    return response;
  } catch (error) {
    throw new Error(`Error fetching data from players by category ${categoryId}`);
  }
}

export { getFreePlayersByCategory };
