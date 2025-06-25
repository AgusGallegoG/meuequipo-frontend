import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamPublic } from '@/team/domain/TeamPublic';
import responseTeamFormMock from '@/team/infrastructure/mocks/responseTeamFormMock.json';
import { mapResponseTeamPublicToTeamPublic } from '@/team/infrastructure/services/teamService';
import type { ResponseTeamPublic } from '../models/responses/ResponseTeamPublic';

async function Api(id: number): Promise<ResponseTeamPublic> {
  const response = await api.get<ResponseTeamPublic>(`/teams/public/${id}`);

  return response.data;
}

async function InMemory(): Promise<ResponseTeamPublic> {
  await UtilBase.wait(500);
  return responseTeamFormMock.content[0] as ResponseTeamPublic;
}

async function getTeamPublicData(id: number): Promise<TeamPublic> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(id);

    return mapResponseTeamPublicToTeamPublic(response);
  } catch (error) {
    throw new Error(`Error fetching details for team ${id}`);
  }
}

export { getTeamPublicData };
