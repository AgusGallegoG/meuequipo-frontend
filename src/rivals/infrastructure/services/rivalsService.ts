import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import type { Rival, RivalItem, RivalTable } from '@/rivals/domain/RivalTable';
import type { RequestSaveRival } from '../models/requests/RequestSaveRival';
import type { ResponseRival } from '../models/responses/ResponseRival';
import type { ResponseRivalItem } from '../models/responses/ResponseRivalTable';

export function mapPageableResponseToRivalsTable(
  response: PageableResponse<ResponseRivalItem>
): RivalTable {
  debugger;
  return {
    content: mapResponseRivalItem(response.content),
    totalRecords: response.totalElements,
  };
}
function mapResponseRivalItem(content: ResponseRivalItem[]): RivalItem[] {
  return content.map((item) => {
    return {
      id: item.id,
      logo: {
        name: item.logo.imageName,
        url: item.logo.imageB64,
      },
      name: item.name,
      tlf: item.tlf,
      responsible: item.responsible,
    };
  });
}

export function mapRivalToRequestSaveRival(rival: Rival): RequestSaveRival {
  return {
    id: rival.id === -1 ? null : rival.id,
    email: rival.email,
    logo: rival.logo
      ? {
          name: rival.logo.name,
          url: rival.logo.url,
        }
      : null,
    name: rival.name,
    responsible: rival.responsible,
    tlf: rival.tlf,
    categories: rival.categories,
  };
}

export function mapResponseRivalToRival(response: ResponseRival): Rival {
  return {
    id: response.id,
    categories: response.categories,
    email: response.email,
    logo: response.logo ? { name: response.logo.imageName, url: response.logo.imageB64 } : null,
    name: response.name,
    responsible: response.responsible,
    tlf: response.tlf,
  };
}
