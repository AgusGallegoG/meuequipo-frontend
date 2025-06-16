import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { SigninTable } from '@/signin/domain/SigninTable';
import responseSigninTableMock from '@/signin/infrastructure/mocks/responseSigninTableMock.json';
import type { RequestSignin } from '../models/requests/RequestSignin';
import type { ResponseSigninItem } from '../models/responses/ResponseSigninItem';
import { mapPageableResponseToSigninTable } from '../service/signinService';

const keysMap = {
  state: 'state',
};

async function Api(
  signin: RequestSignin,
  pageable: Pageable
): Promise<PageableResponse<ResponseSigninItem>> {
  const response = await api.post<PageableResponse<ResponseSigninItem>>('/signin/admin', signin, {
    params: createPageParams(pageable, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseSigninItem>> {
  await UtilBase.wait(500);

  return responseSigninTableMock as PageableResponse<ResponseSigninItem>;
}

async function saveSignin(signin: RequestSignin, pageable: Pageable): Promise<SigninTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(signin, pageable);

    return mapPageableResponseToSigninTable(response);
  } catch (error) {
    throw new Error(`Error saving/updating signin from adminview`);
  }
}

export { saveSignin };
