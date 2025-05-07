import type { Sponsor } from '@/sponsor/domain/Sponsor';
import type {
  ResponseSponsorFooter,
  ResponseSponsorFooterList,
} from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';

function mapResponseSponsorFooterListToSponsor(responseSpo: ResponseSponsorFooter): Sponsor {
  return {
    id: responseSpo.id,
    logo: responseSpo.logo,
    name: responseSpo.name,
    url: responseSpo.url,
  };
}

export function createSponsorFooterListFromResponseSponsorFooterList(
  response: ResponseSponsorFooterList
): Sponsor[] {
  return response.content.map(mapResponseSponsorFooterListToSponsor);
}
