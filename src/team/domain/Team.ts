import type { ImageView } from '@/shared/dominio/ImageView';

export type Team = {
  id: number;
  name: string;
  category: number | null;
  trainer: string;
  teamImage: ImageView | null;
};

export type TeamForm = Team & {
  trainerContact: string;
  players: number[];
};

export const defaultTeamForm: TeamForm = {
  id: -1,
  category: null,
  name: '',
  players: [],
  teamImage: null,
  trainer: '',
  trainerContact: '',
};
