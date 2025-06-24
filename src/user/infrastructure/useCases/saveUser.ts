import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { UserItem } from '@/user/domain/UserTable';
import getUserTableMock from '@/user/infrastructure/mocks/getUserTableMock.json';
import type { RequestSaveUser } from '@/user/infrastructure/models/request/RequestSaveUser';
import type { ResponseUser } from '@/user/infrastructure/models/response/ResponseUserTable';
import { mapResponseUserToUserItem } from '@/user/infrastructure/services/usersService';

async function Api(user: RequestSaveUser): Promise<ResponseUser> {
  const response = await api.post<ResponseUser>('/users', user);

  return response.data;
}

async function InMemory(): Promise<ResponseUser> {
  await UtilBase.wait(500);
  return getUserTableMock.content[0] as ResponseUser;
}

async function saveUser(user: RequestSaveUser): Promise<UserItem> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(user);
    return mapResponseUserToUserItem(response);
  } catch (error) {
    throw new Error(`Error saving/updating user`);
  }
}

export { saveUser };
