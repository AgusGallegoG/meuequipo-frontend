import { defaultPlayer, type Player } from '@/shared/dominio/Player';

export type Signin = {
  id: number;
  parentName: string;
  parentSurnames: string;
  mail: string;
  phone: string;
  state: number;
  player: Player;
};

export const defaultSignin: Signin = {
  id: -1,
  mail: '',
  parentName: '',
  parentSurnames: '',
  phone: '',
  state: -1,
  player: { ...defaultPlayer },
};
