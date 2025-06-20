import type { Select } from '@/shared/dominio/Select';

export type ViewSquad = {
  id: number;
  date: Date;
  location: string;
  players: Select[];
};
