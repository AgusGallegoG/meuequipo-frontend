import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';

export interface ResponseTeamMenuItem extends ResponseSelect {
  teams: ResponseSelect[];
}
