import { UtilBase } from '@/core/utilities/UtilBase';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import type { ResponseSponsorFooterList } from '@/sponsor/infrastructure/models/responses/ResponseSponsorFooter';
import responsesponsorfooter from '@/sponsor/infrastructure/mocks/responseSponsorFooterMock.json';
import type { AxiosResponse } from 'axios';
import api from '@/core/network';
import { createSponsorFooterListFromResponseSponsorFooterList } from '@/sponsor/infrastructure/services/sponsorsService';

async function Api(): Promise<ResponseSponsorFooterList> {
  const response = await api.get<null, AxiosResponse<ResponseSponsorFooterList>>('/sponsors/all');
  return response.data;
}

async function InMemory(): Promise<ResponseSponsorFooterList> {
  await UtilBase.wait(500);
  return responsesponsorfooter;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return createSponsorFooterListFromResponseSponsorFooterList(response);
  } catch (error) {
    throw new Error(`Error recuperando os patrocinadores para a visualizacion no layout`);
  }
}
