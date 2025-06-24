import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

export interface ResponseTeamPublic {
  id: number;
  name: string;
  category: number;
  sex: number;
  teamImage: ResponseImage | null;
}
