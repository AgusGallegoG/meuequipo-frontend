import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseMatch {
  id: number;
  localTeam: ResponseMatchTeam;
  visitorTeam: ResponseMatchTeam;
  localPoints: number | null;
  visitorPoints: number | null;
  category: number;
  matchDate: string;
  location: string;
  state: number;
}

export interface ResponseMatchTeam {
  id: number;
  name: string;
  logo: ResponseImage | null;
  isOurTeam: boolean;
}
