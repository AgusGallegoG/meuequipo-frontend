import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import responseSponsorAdminMock from '@/sponsor/infrastructure/mocks/responseSponsorAdminMock.json';
import type { RequestSaveSponsor } from '@/sponsor/infrastructure/models/requests/RequestSaveSponsor';
import type { ResponseSponsor } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import { mapResponseSponsorToSponsor } from '@/sponsor/infrastructure/services/sponsorsService';

const keysMap = {
  name: 'name',
};

async function Api(request: RequestSaveSponsor): Promise<ResponseSponsor> {
  const response = await api.post<ResponseSponsor>('/sponsors', request);

  return response.data;
}

async function InMemory(): Promise<ResponseSponsor> {
  await UtilBase.wait(500);
  return responseSponsorAdminMock.content[0] as ResponseSponsor;
}

async function saveSponsor(request: RequestSaveSponsor): Promise<Sponsor> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(request);

    return mapResponseSponsorToSponsor(response);
  } catch (error) {
    throw new Error(`Error saving/updating sponsor`);
  }
}

export { saveSponsor };
