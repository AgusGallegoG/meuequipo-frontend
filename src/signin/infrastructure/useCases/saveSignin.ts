import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { SigninItem } from '@/signin/domain/SigninTable';
import responseSigninTableMock from '@/signin/infrastructure/mocks/responseSigninTableMock.json';
import type { RequestSignin } from '@/signin/infrastructure/models/requests/RequestSignin';
import type { ResponseSigninItem } from '@/signin/infrastructure/models/responses/ResponseSigninItem';
import { mapResponseSigninItemToSigninItem } from '@/signin/infrastructure/service/signinService';

async function Api(signin: RequestSignin): Promise<ResponseSigninItem> {
  const response = await api.post<ResponseSigninItem>('/signin/admin', signin);

  return response.data;
}

async function InMemory(): Promise<ResponseSigninItem> {
  await UtilBase.wait(500);

  return responseSigninTableMock[0] as ResponseSigninItem;
}

async function saveSignin(signin: RequestSignin): Promise<SigninItem> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(signin);

    return mapResponseSigninItemToSigninItem(response);
  } catch (error) {
    throw new Error(`Error saving/updating signin from adminview`);
  }
}

export { saveSignin };
