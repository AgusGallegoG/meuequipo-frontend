export type Player = {
  id: number;
  name: string;
  surnames: string;
  birthDate: Date | null;
  sex: number;
  category: number;
};

export const defaultPlayer: Player = {
  id: -1,
  name: '',
  surnames: '',
  birthDate: null,
  category: -1,
  sex: -1,
};
