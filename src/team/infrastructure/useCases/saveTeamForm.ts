import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamItem } from '@/team/domain/TeamTable';
import responseTeamItemAdminMock from '@/team/infrastructure/mocks/responseTeamItemAdminMock.json';
import type { RequestTeamForm } from '@/team/infrastructure/models/requests/RequestTeamForm';
import type { ResponseTeamItem } from '@/team/infrastructure/models/responses/ResponseTeamItem';
import { mapResponseTeamItemToTeamItem } from '@/team/infrastructure/services/teamService';

async function Api(team: RequestTeamForm): Promise<ResponseTeamItem> {
  const response = await api.post<ResponseTeamItem>('/teams', team);

  return response.data;
}

async function InMemory(): Promise<ResponseTeamItem> {
  await UtilBase.wait(500);
  return responseTeamItemAdminMock.content[0] as ResponseTeamItem;
}

async function saveTeamForm(team: RequestTeamForm): Promise<TeamItem> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(team);

    return mapResponseTeamItemToTeamItem(response);
  } catch (error) {
    throw new Error(`Erro saving/updating team`);
  }
}

export { saveTeamForm };
