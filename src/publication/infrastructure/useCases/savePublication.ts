import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { Publication } from '@/publication/domain/Publication';
import responseAdminBlogTableMock from '@/publication/infrastructure/mocks/responseAdminBlogTableMock.json';
import type { RequestSavePublication } from '@/publication/infrastructure/models/requests/RequestSavePublication';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { mapResponsePublicationToPublication } from '@/publication/infrastructure/services/publicationService';

async function Api(publication: RequestSavePublication): Promise<ResponsePublication> {
  const response = await api.post<ResponsePublication>('/blog', publication);

  return response.data;
}

async function InMemory(): Promise<ResponsePublication> {
  await UtilBase.wait(500);

  return responseAdminBlogTableMock.content[0] as ResponsePublication;
}

async function savePublication(publication: RequestSavePublication): Promise<Publication> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(publication);

    return mapResponsePublicationToPublication(response);
  } catch (error) {
    throw new Error(`Error saving/updating publication`);
  }
}

export { savePublication };
