import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { mapImageViewToRequestImage } from '@/shared/infrastructure/service/imageService';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import type { SponsorTable } from '@/sponsor/domain/SponsorTable';
import type { ResponseSponsor } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import type { RequestSaveSponsor } from '../models/requests/RequestSaveSponsor';

export function mapResponseSponsorToSponsor(responseSpo: ResponseSponsor): Sponsor {
  return {
    id: responseSpo.id,
    logo: responseSpo.logo
      ? {
          name: responseSpo.logo.name,
          url: responseSpo.logo.url,
          id: responseSpo.logo.id,
        }
      : null,
    name: responseSpo.name,
    url: responseSpo.url,
  };
}

export function createSponsorListFromResponseSponsorList(response: ResponseSponsor[]): Sponsor[] {
  return response.map(mapResponseSponsorToSponsor);
}

export function mapSponsorToRequestSaveSponsor(sponsor: Sponsor): RequestSaveSponsor {
  return {
    id: sponsor.id === -1 ? null : sponsor.id,
    logo: sponsor.logo ? mapImageViewToRequestImage(sponsor.logo) : null,
    name: sponsor.name,
    url: sponsor.url,
  };
}

export function mapPageableSponsorResponseToSponsorTable(
  response: PageableResponse<ResponseSponsor>
): SponsorTable {
  return {
    content: createSponsorListFromResponseSponsorList(response.content),
    totalRecords: response.totalElements,
  };
}
