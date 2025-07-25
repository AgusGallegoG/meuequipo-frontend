import type { RequestImage } from '@/shared/infrastructure/models/requests/RequestImage';

export interface RequestSaveSponsor {
  id: number | null;
  name: string;
  url: string;
  logo: RequestImage | null;
}
