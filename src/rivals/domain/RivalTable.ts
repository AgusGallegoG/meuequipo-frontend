import type { ImageUpload } from '@/shared/dominio/ImageUpload';
import type { ImageView } from '@/shared/dominio/ImageView';

export type RivalTable = {
  content: RivalItem[];
  totalRecords: number;
};

export type RivalItem = {
  id: number;
  logo: ImageView | null;
  tlf: string;
  name: string;
  responsible: string;
};

export type Rival = RivalItem & {
  email: string;
  categories: number[];
};

export const defaultRivalTable: RivalTable = {
  content: [],
  totalRecords: 0,
};

export const defaultRival: Rival = {
  id: -1,
  logo: null,
  name: '',
  responsible: '',
  email: '',
  tlf: '',
  categories: [],
};
