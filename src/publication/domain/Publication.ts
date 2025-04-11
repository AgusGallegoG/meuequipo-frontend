import type { Image } from '@/shared/dominio/Image';

export type Publication = {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  images: Image[];
};
