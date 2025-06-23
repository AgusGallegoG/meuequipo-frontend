import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import type { UserItem, UserTable } from '@/user/domain/UserTable';
import type { ResponseUser } from '@/user/infrastructure/models/response/ResponseUserTable';
import type { RequestSaveUser } from '../models/request/RequestSaveUser';

export function mapPageableResponseToUserTable(
  response: PageableResponse<ResponseUser>
): UserTable {
  return {
    content: mapResponseUserListToUserItemList(response.content),
    totalRecords: response.totalElements,
  };
}
function mapResponseUserListToUserItemList(content: ResponseUser[]): UserItem[] {
  return content.map(mapResponseUserToUserItem);
}

export function mapResponseUserToUserItem(res: ResponseUser): UserItem {
  return {
    active: res.active ? res.active : false,
    email: res.email ? res.email : '',
    name: res.name ? res.name : '',
    surnames: res.surnames ? res.surnames : '',
    id: res.id,
  };
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
