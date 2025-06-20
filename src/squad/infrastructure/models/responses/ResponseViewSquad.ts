import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';

export interface ResponseViewSquad {
  id: number;
  date: string;
  location: string;
  players: ResponseSelect[];
}
