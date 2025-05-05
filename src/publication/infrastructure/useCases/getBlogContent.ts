import type { Publication } from '@/publication/domain/Publication';
import responsepublication from '@/publication/infrastructure/mocks/responsePublicationMock.json';
import type { ResponsePublicationList } from '../models/responses/ResponsePublicationList';
import { createPublicationListFromResponsePublicationList } from '../services/publicationService';
import api from '@/core/network';
import type { AxiosResponse } from 'axios';
import { UtilBase } from '@/core/utilities/UtilBase';
// import { buildPaginationParams } from '@/core/infrastructure/service/paginationParams';

async function Api(isInicio: boolean): Promise<ResponsePublicationList> {
  const response = await api.get<boolean, AxiosResponse<ResponsePublicationList>>('/blog/all', {
    params: { isInicio },
  });

  return response.data;
}

async function InMemory(): Promise<ResponsePublicationList> {
  await UtilBase.wait(500);
  // throw new Error('Error por mis pelotas');
  return responsepublication;
}

export async function getBlogContent(isInicio: boolean): Promise<Publication[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(isInicio);
    return createPublicationListFromResponsePublicationList(response);
  } catch (error) {
    throw new Error('Error obteniendo los datos de la pantalla de inicio');
  }
}
