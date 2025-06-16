import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import responseTeamMenuItemMock from '@/team/infrastructure/mocks/responseTeamMenuItemMock.json';
import type { ResponseTeamMenuItem } from '@/team/infrastructure/models/responses/ResponseTeamMenuItem';
import { mapResponseTeamMenuItemToMenuItemList } from '@/team/infrastructure/services/teamService';
import type { MenuItem } from 'primevue/menuitem';

async function Api(): Promise<ResponseTeamMenuItem[]> {
  const response = await api.get<ResponseTeamMenuItem[]>('teams/menu');

  return response.data;
}

async function InMemory(): Promise<ResponseTeamMenuItem[]> {
  UtilBase.wait(500);

  return responseTeamMenuItemMock as ResponseTeamMenuItem[];
}

async function getTeamMenuItems(): Promise<MenuItem[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();

    return mapResponseTeamMenuItemToMenuItemList(response);
  } catch (error) {
    throw new Error(`Error fetching teamMenuItems from teams fro baselayout`);
  }
}

export { getTeamMenuItems };
