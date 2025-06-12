import type { RequestImage } from '@/shared/infrastructure/models/requests/RequestImage';

export interface RequestSavePublication {
  id: number | null;
  title: string;
  body: string;
  images: RequestImage[] | null;
}
