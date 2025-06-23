import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { SponsorTable } from '@/sponsor/domain/SponsorTable';
import responseSponsorAdminMock from '@/sponsor/infrastructure/mocks/responseSponsorAdminMock.json';
import type { RequestSaveSponsor } from '@/sponsor/infrastructure/models/requests/RequestSaveSponsor';
import type { ResponseSponsor } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import { mapPageableSponsorResponseToSponsorTable } from '../services/sponsorsService';

const keysMap = {
  name: 'name',
};

async function Api(
  request: RequestSaveSponsor,
  page: Pageable
): Promise<PageableResponse<ResponseSponsor>> {
  const response = await api.post<PageableResponse<ResponseSponsor>>('/sponsors', request, {
    params: createPageParams(page, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponseSponsor>> {
  await UtilBase.wait(500);
  return responseSponsorAdminMock as PageableResponse<ResponseSponsor>;
}

async function saveSponsor(request: RequestSaveSponsor, page: Pageable): Promise<SponsorTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(request, page);

    return mapPageableSponsorResponseToSponsorTable(response);
  } catch (error) {
    throw new Error(`Error saving/updating sponsor`);
  }
}

export { saveSponsor };
