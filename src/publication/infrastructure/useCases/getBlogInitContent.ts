import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Publication } from '@/publication/domain/Publication';
import responsepublication from '@/publication/infrastructure/mocks/responsePublicationMock.json';
import type { ResponsePublicationList } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { createPublicationListFromResponsePublicationList } from '@/publication/infrastructure/services/publicationService';
// import { buildPaginationParams } from '@/core/infrastructure/service/paginationParams';

async function Api(): Promise<ResponsePublicationList> {
  const response = await api.get<ResponsePublicationList>('/blog/all');

  return response.data;
}

async function InMemory(): Promise<ResponsePublicationList> {
  await UtilBase.wait(500);
  // throw new Error('Error de prueba');
  return responsepublication;
}

async function getBlogInitContent(): Promise<Publication[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return createPublicationListFromResponsePublicationList(response.content);
  } catch (error) {
    throw new Error('Error obteniendo los datos de la pantalla de inicio');
  }
}

export { getBlogInitContent };
