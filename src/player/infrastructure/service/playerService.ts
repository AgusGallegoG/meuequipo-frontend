import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { mapToLocaleDateString, parseBackendDate } from '@/core/utilities/UtilDate';
import type { Player } from '@/player/domain/Player';
import type { PlayerTable } from '@/player/domain/PlayerTable';
import type { RequestPlayer } from '@/player/infrastructure/models/requests/RequestPlayer';
import type { ResponsePlayer } from '@/player/infrastructure/models/responses/ResponsePlayer';

export function mapResponsePlayerToPlayer(response: ResponsePlayer): Player {
  return {
    id: response.id,
    birthDate: parseBackendDate(response.birthDate),
    category: response.category,
    name: response.name,
    sex: response.sex,
    surnames: response.surnames,
  };
}

export function mapPlayerToRequestPlayer(player: Player): RequestPlayer {
  return {
    id: player.id !== -1 ? player.id : null,
    birthDate: player.birthDate ? mapToLocaleDateString(player.birthDate) : '',
    category: player.category,
    name: player.name,
    sex: player.sex,
    surnames: player.surnames,
  };
}

export function mapPageableResponseToPlayer(
  response: PageableResponse<ResponsePlayer>
): PlayerTable {
  return {
    content: response.content.map(mapResponsePlayerToPlayer),
    totalRecords: response.page.totalElements,
  };
}
