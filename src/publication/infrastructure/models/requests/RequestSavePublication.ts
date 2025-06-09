import type { RequestImage } from '@/shared/infrastructure/models/RequestImage';

export interface RequestSavePublication {
  id: number | null;
  title: string;
  body: string;
  images: RequestImage[] | null;
}
