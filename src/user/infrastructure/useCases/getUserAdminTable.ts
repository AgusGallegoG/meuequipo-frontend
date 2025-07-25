import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { UserTable } from '@/user/domain/UserTable';
import getUserTableMock from '@/user/infrastructure/mocks/getUserTableMock.json';
import type { ResponseUser } from '@/user/infrastructure/models/response/ResponseUserTable';
import { mapPageableResponseToUserTable } from '@/user/infrastructure/services/usersService';

const keysMap = {
  active: 'isActive',
  name: 'name',
  surnames: 'surnames',
  email: 'email',
};

async function Api(pageParams: Pageable): Promise<PageableResponse<ResponseUser>> {
  const response = await api.get<PageableResponse<ResponseUser>>('/users', {
    params: createPageParams(pageParams, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseUser>> {
  await UtilBase.wait(500);
  return getUserTableMock as PageableResponse<ResponseUser>;
}

async function getUserAdminTable(params: Pageable): Promise<UserTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(params);

    return mapPageableResponseToUserTable(response);
  } catch (error) {
    throw new Error(`Error getting users from backend`);
  }
}

export { getUserAdminTable };
