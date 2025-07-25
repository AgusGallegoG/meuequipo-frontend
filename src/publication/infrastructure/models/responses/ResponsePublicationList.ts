import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export type ResponsePublication = {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  images: ResponseImage[] | null;
};
