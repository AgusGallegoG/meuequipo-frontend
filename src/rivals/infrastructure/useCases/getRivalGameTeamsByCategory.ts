import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import gameTeamsListMock from '@/rivals/infrastructure/mocks/rivalsGameTeamsListMock.json';
import type { GameTeam } from '@/shared/dominio/Game';
import type { ResponseGameTeam } from '@/shared/infrastructure/models/responses/ResponseGame';
import { mapResponseGameTeamListToGameTeamList } from '@/shared/infrastructure/service/gameService';

async function Api(categoryId: number): Promise<ResponseGameTeam[]> {
  const response = await api.get<ResponseGameTeam[]>('/rivals/game-team', {
    params: { categoryId: categoryId },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseGameTeam[]> {
  await UtilBase.wait(500);
  return gameTeamsListMock.content as ResponseGameTeam[];
}

async function getRivalGameTeamsByCategory(categoryId: number): Promise<GameTeam[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(categoryId);

    return mapResponseGameTeamListToGameTeamList(response);
  } catch (error) {
    throw new Error(`Error fetchig rivals by category :${categoryId}`);
  }
}

export { getRivalGameTeamsByCategory };
