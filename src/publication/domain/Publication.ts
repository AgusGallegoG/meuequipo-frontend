import type { ImageView } from '@/shared/dominio/ImageView';

export type Publication = {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  images: ImageView[];
};
