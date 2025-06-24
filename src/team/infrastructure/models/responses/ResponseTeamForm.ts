import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseTeam {
  id: number;
  name: string;
  category: number;
  trainer: string;
  teamImage: ResponseImage | null;
}

export interface ResponseTeamForm extends ResponseTeam {
  trainerContact: string | null;
  players: number[] | null;
}
