import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamForm } from '@/team/domain/Team';
import responseTeamFormMock from '@/team/infrastructure/mocks/responseTeamFormMock.json';
import type { ResponseTeamForm } from '@/team/infrastructure/models/responses/ResponseTeamForm';
import { mapResponseTeamFormToTeamForm } from '@/team/infrastructure/services/teamService';

async function Api(id: number): Promise<ResponseTeamForm> {
  const response = await api.get<ResponseTeamForm>(`/teams/${id}`);

  return response.data;
}

async function InMemory(): Promise<ResponseTeamForm> {
  await UtilBase.wait(500);
  return responseTeamFormMock.content[0] as ResponseTeamForm;
}

async function getTeamFormDetails(id: number): Promise<TeamForm> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(id);

    return mapResponseTeamFormToTeamForm(response);
  } catch (error) {
    throw new Error(`Error fetching details for team ${id}`);
  }
}

export { getTeamFormDetails };
