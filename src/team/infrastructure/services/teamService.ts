import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import router from '@/core/router';
import type { ResponseSelect } from '@/shared/infrastructure/models/responses/ResponseSelect';
import { mapResponseImageToImageView } from '@/shared/infrastructure/service/imageService';
import type { Team, TeamForm } from '@/team/domain/Team';
import type { TeamPublic } from '@/team/domain/TeamPublic';
import type { TeamItem, TeamTable } from '@/team/domain/TeamTable';
import type { MenuItem } from 'primevue/menuitem';
import type { RequestTeamForm } from '../models/requests/RequestTeamForm';
import type { ResponseTeam, ResponseTeamForm } from '../models/responses/ResponseTeamForm';
import type { ResponseTeamItem } from '../models/responses/ResponseTeamItem';
import type { ResponseTeamMenuItem } from '../models/responses/ResponseTeamMenuItem';
import type { ResponseTeamPublic } from '../models/responses/ResponseTeamPublic';

export function mapResponseTeamFormToTeamForm(resp: ResponseTeamForm): TeamForm {
  return {
    category: resp.category,
    sex: resp.sex,
    id: resp.id,
    name: resp.name,
    players: resp.players ?? [],
    teamImage: resp.teamImage ? mapResponseImageToImageView(resp.teamImage) : null,
    trainer: resp.trainer,
    trainerContact: resp.trainerContact ?? '',
  };
}

export function mapResponseTeamPublicToTeamPublic(resp: ResponseTeamPublic): TeamPublic {
  return {
    category: resp.category,
    sex: resp.sex,
    id: resp.id,
    name: resp.name,
    teamImage: resp.teamImage ? mapResponseImageToImageView(resp.teamImage) : null,
  };
}

export function mapResponseTeamToTeam(resp: ResponseTeam): Team {
  return {
    category: resp.category,
    id: resp.id,
    sex: resp.sex,
    name: resp.name,
    teamImage: resp.teamImage ? mapResponseImageToImageView(resp.teamImage) : null,
    trainer: resp.trainer,
  };
}

export function mapTeamFormToRequestTeamForm(team: TeamForm): RequestTeamForm {
  return {
    id: team.id === -1 ? null : team.id,
    category: team.category ?? -1,
    sex: team.sex ?? -1,
    name: team.name,
    players: team.players,
    teamImage: team.teamImage ?? null,
    trainer: team.trainer,
    trainerContact: team.trainerContact,
  };
}

export function mapResponseTeamItemListToTeamItemList(item: ResponseTeamItem[]): TeamItem[] {
  return item.map(mapResponseTeamItemToTeamItem);
}

export function mapResponseTeamItemToTeamItem(item: ResponseTeamItem): TeamItem {
  return {
    id: item.id,
    sex: item.sex,
    category: item.category,
    name: item.name,
    playerCount: item.playerCount,
    trainer: item.trainer,
  };
}

export function mapPageableResponseToTeamTable(
  response: PageableResponse<ResponseTeamItem>
): TeamTable {
  return {
    content: mapResponseTeamItemListToTeamItemList(response.content),
    totalRecords: response.page.totalElements,
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
