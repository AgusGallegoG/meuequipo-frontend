import type { Player } from '@/player/domain/Player';

export type PlayerTable = {
  content: Player[];
  totalRecords: number;
};

export const defaultPlayerTable: PlayerTable = {
  content: [],
  totalRecords: 0,
};
