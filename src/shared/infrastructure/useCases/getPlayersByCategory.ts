import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Select } from '@/shared/dominio/Select';
import responsePlayersMock from '@/shared/infrastructure/mocks/responsePlayersMock.json';
import type { ResponseSelect } from '../models/responses/ResponseSelect';

async function Api(categoryId: number): Promise<ResponseSelect[]> {
  const response = await api.get<ResponseSelect[]>('/players', {
    params: {
      idCategory: categoryId,
    },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseSelect[]> {
  await UtilBase.wait(500);
  return responsePlayersMock.content as ResponseSelect[];
}

async function getPlayersByCategory(categoryId: number): Promise<Select[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(categoryId);

    return response;
  } catch (error) {
    throw new Error(`Error fetching data from players by category ${categoryId}`);
  }
}

export { getPlayersByCategory };
