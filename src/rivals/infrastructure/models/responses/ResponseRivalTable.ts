import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseRivalItem {
  logo: ResponseImage | null;
  name: string;
  id: number;
  tlf: string;
  responsible: string | null;
}
