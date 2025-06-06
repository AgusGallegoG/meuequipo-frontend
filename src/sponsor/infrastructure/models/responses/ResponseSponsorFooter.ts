import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';

export type ResponseSponsorFooterList = {
  content: ResponseSponsor[];
};

export type ResponseSponsor = {
  id: number;
  name: string;
  logo: ResponseImage | null;
  url: string;
};
