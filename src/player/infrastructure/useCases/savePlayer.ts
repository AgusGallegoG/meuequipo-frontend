import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Player } from '@/player/domain/Player';
import responsePlayerMock from '@/player/infrastructure/mocks/responsePlayerMock.json';
import type { RequestPlayer } from '@/player/infrastructure/models/requests/RequestPlayer';
import type { ResponsePlayer } from '@/player/infrastructure/models/responses/ResponsePlayer';
import { mapResponsePlayerToPlayer } from '@/player/infrastructure/service/playerService';

async function Api(player: RequestPlayer): Promise<ResponsePlayer> {
  const response = await api.post<ResponsePlayer>('/players/admin', player);

  return response.data;
}

async function InMemory(): Promise<ResponsePlayer> {
  await UtilBase.wait(500);

  return responsePlayerMock as ResponsePlayer;
}

async function savePlayer(player: RequestPlayer): Promise<Player> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(player);

    return mapResponsePlayerToPlayer(response);
  } catch (error) {
    throw new Error(`Error saving/updating player from adminview`);
  }
}

export { savePlayer };
