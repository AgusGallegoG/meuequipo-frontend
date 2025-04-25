import { type LoginResponse } from '@/auth/domain/LoginResponse';
import type { User } from '@/auth/domain/User';
import { UtilBase } from '@/core/utilities/UtilBase';
import Cookies from 'js-cookie';

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
