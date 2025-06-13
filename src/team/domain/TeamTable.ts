export type TeamTable = {
  content: TeamItem[];
  totalRecords: number;
};

export type TeamItem = {
  id: number;
  name: string;
  category: number;
  trainer: string;
  playerCount: number;
};

export const defaultTeamTable: TeamTable = {
  content: [],
  totalRecords: 0,
};
