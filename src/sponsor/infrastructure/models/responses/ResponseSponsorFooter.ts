import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseSponsorFooterList {
  content: ResponseSponsor[];
}

export interface ResponseSponsor {
  id: number;
  name: string;
  logo: ResponseImage | null;
  url: string;
}
