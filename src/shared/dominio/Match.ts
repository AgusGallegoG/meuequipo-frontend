import type { ImageView } from '@/shared/dominio/ImageView';

export type Match = {
  id: number;
  localTeam: MatchTeam | null;
  localPoints: number | null;
  visitorTeam: MatchTeam | null;
  visitorPoints: number | null;
  category: number | null;
  location: string;
  matchDate: Date | null;
  state: number | null;
};

export type MatchTeam = {
  id: number;
  name: string;
  logo: ImageView | null;
  isOurTeam: boolean;
};

export const defaultMatchTeam: MatchTeam = {
  id: -1,
  logo: null,
  name: '',
  isOurTeam: false,
};

export const defaultMatch: Match = {
  id: -1,
  category: null,
  localTeam: null,
  localPoints: null,
  visitorTeam: null,
  visitorPoints: null,
  location: '',
  matchDate: null,
  state: null,
};
