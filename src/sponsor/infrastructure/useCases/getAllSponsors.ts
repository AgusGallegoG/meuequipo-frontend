import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import responsesponsorfooter from '@/sponsor/infrastructure/mocks/responseSponsorFooterMock.json';
import type { ResponseSponsor } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import { createSponsorListFromResponseSponsorList } from '@/sponsor/infrastructure/services/sponsorsService';

async function Api(): Promise<ResponseSponsor[]> {
  const response = await api.get<ResponseSponsor[]>('/sponsors/public/footer');
  return response.data;
}

async function InMemory(): Promise<ResponseSponsor[]> {
  await UtilBase.wait(500);
  return responsesponsorfooter.content as ResponseSponsor[];
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return createSponsorListFromResponseSponsorList(response);
  } catch (error) {
    throw new Error(`Error recuperando os patrocinadores para a visualizacion no layout`);
  }
}
