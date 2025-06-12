import type { ResponsePlayer } from '@/shared/infrastructure/models/responses/ResponsePlayer';

export interface ResponseSignin {
  id: number;
  parentName: string;
  parentSurnames: string;
  mail: string;
  phone: string;
  state: number;
  player: ResponsePlayer;
}
