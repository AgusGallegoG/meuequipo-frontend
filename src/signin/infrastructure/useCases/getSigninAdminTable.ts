import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { SigninFilters } from '@/signin/domain/SigninFilters';
import type { SigninTable } from '@/signin/domain/SigninTable';
import responseSigninTableMock from '@/signin/infrastructure/mocks/responseSigninTableMock.json';
import type { ResponseSigninItem } from '@/signin/infrastructure/models/responses/ResponseSigninItem';
import { mapPageableResponseToSigninTable } from '@/signin/infrastructure/service/signinService';

const keysMap = {
  state: 'state',
};

async function Api(filters: SigninFilters): Promise<PageableResponse<ResponseSigninItem>> {
  const response = await api.get<PageableResponse<ResponseSigninItem>>('signin/admin', {
    params: {
      ...createPageParams(filters.lazyParams, keysMap),
      categoryId: filters.categoryId,
      signinState: filters.signinState,
    },
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseSigninItem>> {
  await UtilBase.wait(500);

  return responseSigninTableMock as PageableResponse<ResponseSigninItem>;
}

async function getSigninAdminTable(filters: SigninFilters): Promise<SigninTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(filters);

    return mapPageableResponseToSigninTable(response);
  } catch (error) {
    throw new Error(`Error fetching signinAdminTable data`);
  }
}

export { getSigninAdminTable };
