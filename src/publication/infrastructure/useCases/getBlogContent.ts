import type { Publication } from '@/publication/domain/Publication';
import responsepublication from '@/publication/infrastructure/mocks/responsePublicationMock.json';
import type { ResponsePublicationList } from '../models/responses/ResponsePublicationList';
import { createPublicationListFromResponsePublicationList } from '../services/publicationService';

async function InMemory(isInicio: boolean): Promise<ResponsePublicationList> {
  return responsepublication;
}

export async function getBlogContent(isInicio: boolean): Promise<Publication[]> {
  try {
    const response = await InMemory(isInicio);
    return createPublicationListFromResponsePublicationList(response);
  } catch (error) {
    throw new Error('Error obteniendo los datos de la pantalla de inicio');
  }
}
