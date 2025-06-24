import type { ImageView } from '@/shared/dominio/ImageView';

export type TeamPublic = {
  id: number;
  name: string;
  category: number;
  sex: number;
  teamImage: ImageView | null;
};

export const defaultTeamPublic: TeamPublic = {
  id: -1,
  category: -1,
  name: '',
  sex: -1,
  teamImage: null,
};
