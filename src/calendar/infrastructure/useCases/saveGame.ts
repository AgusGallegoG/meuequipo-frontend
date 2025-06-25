import responseGameListMock from '@/calendar/infrastructure/mocks/responseGameListMock.json';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Game } from '@/shared/dominio/Game';
import type { RequestGame } from '@/shared/infrastructure/models/requests/RequestGame';
import type { ResponseGame } from '@/shared/infrastructure/models/responses/ResponseGame';
import { mapResponseGameToGame } from '@/shared/infrastructure/service/gameService';

async function Api(game: RequestGame): Promise<ResponseGame> {
  const response = await api.post<ResponseGame>('/calendars/game', game);

  return response.data;
}

async function InMemory(): Promise<ResponseGame> {
  await UtilBase.wait(500);

  return responseGameListMock[0] as ResponseGame;
}

async function saveGame(game: RequestGame): Promise<Game> {
  try {
    debugger;
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(game);

    return mapResponseGameToGame(response);
  } catch (error) {
    throw new Error(`Error saving/updating game from calendarAdmin`);
  }
}

export { saveGame };
