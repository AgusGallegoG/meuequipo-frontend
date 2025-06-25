import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { GameTeam } from '@/shared/dominio/Game';
import type { ResponseGameTeam } from '@/shared/infrastructure/models/responses/ResponseGame';
import { mapResponseGameTeamListToGameTeamList } from '@/shared/infrastructure/service/gameService';
import gameTeamsListMock from '@/team/infrastructure/mocks/ownGameTeamsListMock.json';

async function Api(categoryId: number): Promise<ResponseGameTeam[]> {
  const response = await api.get<ResponseGameTeam[]>('/teams/game-team', {
    params: { categoryId: categoryId },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseGameTeam[]> {
  await UtilBase.wait(500);
  return gameTeamsListMock.content as ResponseGameTeam[];
}

async function getOwnGameTeamsByCategory(categoryId: number): Promise<GameTeam[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(categoryId);

    return mapResponseGameTeamListToGameTeamList(response);
  } catch (error) {
    throw new Error(`Error fetchig rivals by category :${categoryId}`);
  }
}

export { getOwnGameTeamsByCategory };
