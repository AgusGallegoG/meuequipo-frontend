import type { CalendarFilter } from '@/calendar/domain/CalendarFilters';
import responseMatchListMock from '@/calendar/infrastructure/mocks/responseMatchListMock.json';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Match } from '@/shared/dominio/Match';
import type { ResponseMatch } from '@/shared/infrastructure/models/responses/ResponseMatch';
import { mapResponseMatchListToMatchList } from '@/shared/infrastructure/service/matchService';
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
): Promise<ResponseMatch[]> {
  const url = isAdmin ? '/calendars/admin' : '/calendars';
  const repsonse = await api.get<ResponseMatch[]>(url, {
    params: {
      filters,
      isSquad: isSquad,
    },
  });

  return repsonse.data;
}

async function InMemory(): Promise<ResponseMatch[]> {
  await UtilBase.wait(500);
  return responseMatchListMock as ResponseMatch[];
}

async function getMatchesList(
  filters: RequestCalendarFilters,
  isAdmin: boolean,
  isSquad: boolean
): Promise<Match[]> {
  try {
    const response = UtilBase.checkEnvironment()
      ? await InMemory()
      : await Api(filters, isAdmin, isSquad);

    return mapResponseMatchListToMatchList(response);
  } catch (error) {
    throw new Error(`Error fetching matches between dates or by teamId`);
  }
}

export { getMatchesList };
