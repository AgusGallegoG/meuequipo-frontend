import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseRival {
  id: number;
  logo: ResponseImage | null;
  name: string;
  responsible: string | null;
  email: string;
  tlf: string;
  categories: number[];
}
