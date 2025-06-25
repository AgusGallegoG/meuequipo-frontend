import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';
import type { ResponseViewSquad } from '@/squad/infrastructure/models/responses/ResponseViewSquad';

export interface ResponseGame {
  id: number;
  localTeam: ResponseGameTeam;
  visitorTeam: ResponseGameTeam;
  localPoints: number | null;
  visitorPoints: number | null;
  category: number;
  gameDate: string;
  location: string;
  state: number;
  squad?: ResponseViewSquad;
}

export interface ResponseGameTeam {
  id: number;
  name: string;
  logo: ResponseImage | null;
  isOurTeam: boolean;
}
