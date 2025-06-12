import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Signin } from '@/signin/domain/Signin';
import responseSigninMock from '@/signin/infrastructure/mocks/responseSigninMock.json';
import { type ResponseSignin } from '../models/responses/ResponseSignin';
import { mapResponseSigninToSignin } from '../service/signinService';

async function Api(signinId: number): Promise<ResponseSignin> {
  const response = await api.get<ResponseSignin>(`/signin/${signinId}`);

  return response.data;
}

async function InMemory(): Promise<ResponseSignin> {
  await UtilBase.wait(500);

  return responseSigninMock as ResponseSignin;
}

async function getSigninDetails(signinId: number): Promise<Signin> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(signinId);

    return mapResponseSigninToSignin(response);
  } catch (error) {
    throw new Error(`Error saving/updating signin from adminview`);
  }
}

export { getSigninDetails };
