import type { User } from '@/auth/domain/User';
import responseLogin from '@/auth/infrastructure/mocks/responseLogin.json';
import type { LoginRequest } from '@/auth/infrastructure/models/requests/LoginRequest';
import type { LoginResponse } from '@/auth/infrastructure/models/responses/LoginResponse';
import {
  createUserFromResponse,
  removeAuthTokenCookie,
  setAuthTokenCookie,
} from '@/auth/infrastructure/service/authService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { AxiosResponse } from 'axios';

async function Api(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginRequest, AxiosResponse<LoginResponse>>('/auth/login', data);
  return response.data;
}

async function InMemory(): Promise<LoginResponse> {
  await UtilBase.wait(2000);
  return responseLogin as LoginResponse;
  // return {} as LoginResponse;
}

async function login(data: LoginRequest): Promise<User> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(data);
    const user = createUserFromResponse(response); // Sirve para comprobar que el response es correcto
    setAuthTokenCookie(response.token);
    return user;
  } catch (error) {
    removeAuthTokenCookie(); // Limpieza de cookie de inicio de sesion por si hubo algun problema
    throw new Error(`Error al realizar la llamda post.login: ${error}`);
  }
}

export { login };
