export type Season = {
  id: number;
  name: string;
  active: boolean;
};

export const emptySeason: Season = {
  active: false,
  name: '',
  id: -1,
};
