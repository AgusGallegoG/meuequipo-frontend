import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';

export interface ResponseRival {
  id: number;
  logo: ResponseImage | null;
  name: string;
  responsible: string;
  email: string;
  tlf: string;
  categories: number[];
}
