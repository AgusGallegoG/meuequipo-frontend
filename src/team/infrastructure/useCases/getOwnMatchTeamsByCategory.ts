import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { MatchTeam } from '@/shared/dominio/Match';
import type { ResponseMatchTeam } from '@/shared/infrastructure/models/responses/ResponseMatch';
import { mapResponseMatchTeamListToMatchTeamList } from '@/shared/infrastructure/service/matchService';
import matchTeamsListMock from '@/team/infrastructure/mocks/ownMatchTeamsListMock.json';

async function Api(categoryId: number): Promise<ResponseMatchTeam[]> {
  const response = await api.get<ResponseMatchTeam[]>('/teams/matchTeam', {
    params: { categoryId: categoryId },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseMatchTeam[]> {
  await UtilBase.wait(500);
  return matchTeamsListMock.content as ResponseMatchTeam[];
}

async function getOwnMatchTeamsByCategory(categoryId: number): Promise<MatchTeam[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(categoryId);

    return mapResponseMatchTeamListToMatchTeamList(response);
  } catch (error) {
    throw new Error(`Error fetchig rivals by category :${categoryId}`);
  }
}

export { getOwnMatchTeamsByCategory };
