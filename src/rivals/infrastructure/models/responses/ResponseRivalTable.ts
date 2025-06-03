import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';

export interface ResponseRivalItem {
  logo: ResponseImage;
  name: string;
  id: number;
  tlf: string;
  responsible: string;
}
