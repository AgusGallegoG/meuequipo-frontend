import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import type { UserItem, UserTable } from '@/user/domain/UserTable';
import type { ResponseUser } from '@/user/infrastructure/models/response/ResponseUserTable';
import type { RequestSaveUser } from '../models/request/RequestSaveUser';

export function mapPageableResponseToUserTable(
  response: PageableResponse<ResponseUser>
): UserTable {
  return {
    content: mapResponseUserToUserItem(response.content),
    totalRecords: response.totalElements,
  };
}
function mapResponseUserToUserItem(content: ResponseUser[]): UserItem[] {
  return content.map((item) => {
    return {
      active: item.active ? item.active : false,
      email: item.email ? item.email : '',
      name: item.name ? item.name : '',
      surnames: item.surnames ? item.surnames : '',
      id: item.id,
    };
  });
}

export function createRequestSaveUserFromUserItem(user: UserItem): RequestSaveUser {
  return {
    id: user.id === -1 ? null : user.id,
    name: user.name,
    surnames: user.surnames,
    email: user.email,
    active: user.active ? user.active : false,
  };
}
