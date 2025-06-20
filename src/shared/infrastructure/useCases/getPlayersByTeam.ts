import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Select } from '@/shared/dominio/Select';
import responsePlayersMock from '@/shared/infrastructure/mocks/responsePlayersMock.json';
import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';

async function Api(teamId: number): Promise<ResponseSelect[]> {
  const response = await api.get<ResponseSelect[]>('/players/team', {
    params: {
      idTeam: teamId,
    },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseSelect[]> {
  await UtilBase.wait(500);
  return responsePlayersMock.content as ResponseSelect[];
}

async function getPlayersByTeam(teamId: number): Promise<Select[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(teamId);

    return response;
  } catch (error) {
    throw new Error(`Error fetching data from players by team ${teamId}`);
  }
}

export { getPlayersByTeam };
