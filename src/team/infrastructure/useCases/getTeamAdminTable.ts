import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { TeamTable } from '@/team/domain/TeamTable';
import responseTeamItemAdminMock from '@/team/infrastructure/mocks/responseTeamItemAdminMock.json';
import type { ResponseTeamItem } from '@/team/infrastructure/models/responses/ResponseTeamItem';
import { mapPageableResponseToTeamTable } from '@/team/infrastructure/services/teamService';

async function Api(pageable: Pageable): Promise<PageableResponse<ResponseTeamItem>> {
  const response = await api.get<PageableResponse<ResponseTeamItem>>('/teams', {
    params: createPageParams(pageable),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseTeamItem>> {
  await UtilBase.wait(500);
  return responseTeamItemAdminMock as PageableResponse<ResponseTeamItem>;
}

async function getTeamAdminTable(pageable: Pageable): Promise<TeamTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(pageable);

    return mapPageableResponseToTeamTable(response);
  } catch (error) {
    throw new Error(`Erro saving/updating team`);
  }
}

export { getTeamAdminTable };
