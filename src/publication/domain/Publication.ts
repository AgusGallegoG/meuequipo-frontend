import type { ImageView } from '@/shared/dominio/ImageView';

export type Publication = {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  images: ImageView[] | null;
};

export const defaultPublication: Publication = {
  body: '',
  title: '',
  creationDate: '',
  images: null,
  id: -1,
};
