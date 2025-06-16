import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import router from '@/core/router';
import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';
import type { Team, TeamForm } from '@/team/domain/Team';
import type { TeamItem, TeamTable } from '@/team/domain/TeamTable';
import type { MenuItem } from 'primevue/menuitem';
import type { RequestTeamForm } from '../models/requests/RequestTeamForm';
import type { ResponseTeam, ResponseTeamForm } from '../models/responses/ResponseTeamForm';
import type { ResponseTeamItem } from '../models/responses/ResponseTeamItem';
import type { ResponseTeamMenuItem } from '../models/responses/ResponseTeamMenuItem';

export function mapResponseTeamFormToTeamForm(resp: ResponseTeamForm): TeamForm {
  return {
    category: resp.category,
    id: resp.id,
    name: resp.name,
    players: resp.players,
    teamImage: resp.teamImage ? resp.teamImage : null,
    trainer: resp.trainer,
    trainerContact: resp.trainerContact,
  };
}

export function mapResponseTeamToTeam(resp: ResponseTeam): Team {
  return {
    category: resp.category,
    id: resp.id,
    name: resp.name,
    teamImage: resp.teamImage ? resp.teamImage : null,
    trainer: resp.trainer,
  };
}

export function mapTeamFormToRequestTeamForm(team: TeamForm): RequestTeamForm {
  return {
    id: team.id === -1 ? null : team.id,
    category: team.category ?? -1,
    name: team.name,
    players: team.players,
    teamImage: team.teamImage ?? null,
    trainer: team.trainer,
    trainerContact: team.trainerContact,
  };
}

export function mapResponseTeamItemToTeamItem(item: ResponseTeamItem[]): TeamItem[] {
  return item.map((item) => {
    return {
      id: item.id,
      category: item.category,
      name: item.name,
      playerCount: item.playerCount,
      trainer: item.trainer,
    };
  });
}

export function mapPageableResponseToTeamTable(
  response: PageableResponse<ResponseTeamItem>
): TeamTable {
  return {
    content: mapResponseTeamItemToTeamItem(response.content),
    totalRecords: response.totalElements,
  };
}

export function mapResponseTeamMenuItemToMenuItemList(
  response: ResponseTeamMenuItem[]
): MenuItem[] {
  return response.map((category) => {
    return {
      label: category.name,
      items: category.teams.map(mapSelectToMenuItemTeamList),
    };
  });
}

function mapSelectToMenuItemTeamList(response: ResponseSelect): MenuItem {
  return {
    label: response.name,
    command: () => {
      router.push({ name: 'TeamDetails', params: { id: response.id } });
    },
  };
}
