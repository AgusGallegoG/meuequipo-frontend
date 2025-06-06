import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { SponsorTable } from '@/sponsor/domain/SponsorTable';
import responseSponsorAdminMock from '@/sponsor/infrastructure/mocks/responseSponsorAdminMock.json';
import type { ResponseSponsor } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import { mapPageableSponsorResponseToSponsorTable } from '@/sponsor/infrastructure/services/sponsorsService';

const keysMap = {
  name: 'name',
};

async function Api(pageParams: Pageable): Promise<PageableResponse<ResponseSponsor>> {
  const response = await api.get<PageableResponse<ResponseSponsor>>('/sponsors/admin', {
    params: createPageParams(pageParams, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseSponsor>> {
  await UtilBase.wait(500);
  return responseSponsorAdminMock as PageableResponse<ResponseSponsor>;
}

async function getSponsorAdminTable(params: Pageable): Promise<SponsorTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(params);

    return mapPageableSponsorResponseToSponsorTable(response);
  } catch (error) {
    throw new Error(`Error getting users from backend`);
  }
}

export { getSponsorAdminTable };
