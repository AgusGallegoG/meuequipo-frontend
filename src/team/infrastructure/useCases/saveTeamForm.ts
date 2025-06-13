import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamTable } from '@/team/domain/TeamTable';
import responseTeamItemAdminMock from '@/team/infrastructure/mocks/responseTeamItemAdminMock.json';
import type { RequestTeamForm } from '@/team/infrastructure/models/requests/RequestTeamForm';
import type { ResponseTeamItem } from '@/team/infrastructure/models/responses/ResponseTeamItem';
import { mapPageableResponseToTeamTable } from '@/team/infrastructure/services/teamService';

async function Api(
  team: RequestTeamForm,
  pageable: Pageable
): Promise<PageableResponse<ResponseTeamItem>> {
  const response = await api.post<PageableResponse<ResponseTeamItem>>('/teams', team, {
    params: createPageParams(pageable),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseTeamItem>> {
  await UtilBase.wait(500);
  return responseTeamItemAdminMock as PageableResponse<ResponseTeamItem>;
}

async function saveTeamForm(team: RequestTeamForm, pageable: Pageable): Promise<TeamTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(team, pageable);

    return mapPageableResponseToTeamTable(response);
  } catch (error) {
    throw new Error(`Erro saving/updating team`);
  }
}

export { saveTeamForm };
