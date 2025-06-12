import type { RequestPlayer } from '@/shared/infrastructure/models/requests/RequestPlayer';

export interface RequestSignin {
  id: number | null;
  parentName: string;
  parentSurnames: string;
  mail: string;
  phone: string;
  state: number | null;
  player: RequestPlayer;
}
