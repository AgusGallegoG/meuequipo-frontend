import { mapToLocaleDateString, parseBackendDate } from '@/core/utilities/UtilDate';
import type { Player } from '@/shared/dominio/Player';
import type { RequestPlayer } from '@/shared/infrastructure/models/requests/RequestPlayer';
import type { ResponsePlayer } from '@/shared/infrastructure/models/responses/ResponsePlayer';

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
