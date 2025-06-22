import type { ChangePass } from '@/auth/domain/ChangePass';
import type { User } from '@/auth/domain/User';
import { type LoginResponse } from '@/auth/infrastructure/models/responses/LoginResponse';
import { UtilBase } from '@/core/utilities/UtilBase';
import Cookies from 'js-cookie';
import type { ChangePassRequest } from '../models/requests/ChangePassRequest';

export function createUserFromResponse(response: LoginResponse): User {
  if (
    !response ||
    !UtilBase.isString(response.completeName) ||
    !UtilBase.isString(response.email) ||
    !UtilBase.isString(response.token) ||
    !Array.isArray(response.authorities)
  ) {
    throw new Error('LoginResponse inválido: faltan campos requeridos.');
  }

  return {
    completeName: response.completeName,
    email: response.email,
    token: response.token,
    authorities: response.authorities,
  };
}

export function setAuthTokenCookie(token: string) {
  Cookies.set('token', token, {
    expires: 1,
    sameSite: import.meta.env.MODE === 'production' ? 'Strict' : 'Lax',
    secure: import.meta.env.MODE === 'production',
    path: '/',
  });
}

/**
 * Eliminamos la cookie en caso de que se haga logout
 */
export function removeAuthTokenCookie() {
  Cookies.remove('token');
}

export function mapChangePassToRequestChangePass(change: ChangePass): ChangePassRequest {
  return {
    newPass: change.newPass,
    oldPass: change.oldPass,
  };
}
