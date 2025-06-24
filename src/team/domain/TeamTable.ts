export type TeamTable = {
  content: TeamItem[];
  totalRecords: number;
};

export type TeamItem = {
  id: number;
  name: string;
  sex: number;
  category: number;
  trainer: string;
  playerCount: number;
};

export const defaultTeamTable: TeamTable = {
  content: [],
  totalRecords: 0,
};
