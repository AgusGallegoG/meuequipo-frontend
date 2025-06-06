import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import type { SponsorTable } from '@/sponsor/domain/SponsorTable';
import type {
  ResponseSponsor,
  ResponseSponsorFooterList,
} from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import type { RequestSaveSponsor } from '../models/requests/RequestSaveSponsor';

function mapResponseSponsorFooterListToSponsor(responseSpo: ResponseSponsor): Sponsor {
  return {
    id: responseSpo.id,
    logo: responseSpo.logo
      ? {
          name: responseSpo.logo.name,
          url: responseSpo.logo.url,
        }
      : null,
    name: responseSpo.name,
    url: responseSpo.url,
  };
}

export function createSponsorFooterListFromResponseSponsorFooterList(
  response: ResponseSponsor[]
): Sponsor[] {
  return response.map(mapResponseSponsorFooterListToSponsor);
}

export function mapSponsorToRequestSaveSponsor(sponsor: Sponsor): RequestSaveSponsor {
  return {
    id: sponsor.id === -1 ? null : sponsor.id,
    logo: sponsor.logo ? { name: sponsor.logo.name, url: sponsor.logo.url } : null,
    name: sponsor.name,
    url: sponsor.url,
  };
}

export function mapPageableSponsorResponseToSponsorTable(
  response: PageableResponse<ResponseSponsor>
): SponsorTable {
  return {
    content: createSponsorFooterListFromResponseSponsorFooterList(response.content),
    totalRecords: response.totalElements,
  };
}
