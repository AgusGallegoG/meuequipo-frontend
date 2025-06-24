import type { RequestImage } from '@/shared/infrastructure/models/requests/RequestImage';

export interface RequestTeamForm {
  id: number | null;
  name: string;
  category: number;
  sex: number;
  trainer: string;
  trainerContact: string;
  teamImage: RequestImage | null;
  players: number[];
}
