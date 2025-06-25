import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Publication } from '@/publication/domain/Publication';
import responsepublication from '@/publication/infrastructure/mocks/responsePublicationMock.json';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { createPublicationListFromResponsePublicationList } from '@/publication/infrastructure/services/publicationService';

async function Api(): Promise<ResponsePublication[]> {
  const response = await api.get<ResponsePublication[]>('/blog/public/init');

  return response.data;
}

async function InMemory(): Promise<ResponsePublication[]> {
  await UtilBase.wait(500);
  // throw new Error('Error de prueba');
  return responsepublication.content as ResponsePublication[];
}

async function getBlogInitContent(): Promise<Publication[]> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();
    return createPublicationListFromResponsePublicationList(response);
  } catch (error) {
    throw new Error('Error obteniendo los datos de la pantalla de inicio');
  }
}

export { getBlogInitContent };
