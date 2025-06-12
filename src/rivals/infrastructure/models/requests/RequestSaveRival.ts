import type { RequestImage } from '@/shared/infrastructure/models/requests/RequestImage';

export interface RequestSaveRival {
  id: number | null;
  logo: RequestImage | null;
  tlf: string;
  name: string;
  responsible: string;
  email: string;
  categories: number[];
}
