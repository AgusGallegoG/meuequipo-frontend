import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import responseGameListMock from '@/calendar/infrastructure/mocks/responseGameListMock.json';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Game } from '@/shared/dominio/Game';
import type { ResponseGame } from '@/shared/infrastructure/models/responses/ResponseGame';
import { mapResponseGameListToGameList } from '@/shared/infrastructure/service/gameService';
import type { RequestCalendarFilters } from '../models/RequestCalendarFilters';

/**\
 * ! FILTERS -> Filtrado por rango de fechas / equipo
 * !isAdmin (True) -> Permite buscar todos los calendatios sin restriccion
 *    ? Si isSquad (true), sólo se muestran los que NO tienen convocatorias
 *    ? Si isSquad (false), se devuelven todos
 * !isAdmin (False)-> Sólo permite la visualización de los partidos en estados publicos (definidos en back (Privado))
 */

async function Api(
  filters: RequestCalendarFilters,
  isAdmin: boolean,
  isSquad: boolean
): Promise<ResponseGame[]> {
  const url = isAdmin ? '/calendars/admin' : '/calendars/public';
  const repsonse = await api.get<ResponseGame[]>(url, {
    params: {
      from: filters.from,
      to: filters.to,
      team: filters.team,
      isSquad: isSquad,
    },
  });

  return repsonse.data;
}

async function InMemory(): Promise<ResponseGame[]> {
  await UtilBase.wait(500);
  return responseGameListMock as ResponseGame[];
}

async function getGamesList(
  filters: RequestCalendarFilters,
  isAdmin: boolean,
  isSquad: boolean
): Promise<Game[]> {
  try {
    const response = UtilBase.checkEnvironment()
      ? await InMemory()
      : await Api(filters, isAdmin, isSquad);

    return mapResponseGameListToGameList(response);
  } catch (error) {
    throw new Error(`Error fetching games between dates or by teamId`);
  }
}

export { getGamesList };
