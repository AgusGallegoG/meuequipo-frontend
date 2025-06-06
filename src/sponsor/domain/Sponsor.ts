import type { ImageView } from '@/shared/dominio/ImageView';

export type Sponsor = {
  id: number;
  logo: ImageView | null;
  name: string;
  url: string;
};

export const defaultSponsor: Sponsor = {
  id: -1,
  logo: null,
  name: '',
  url: '',
};
