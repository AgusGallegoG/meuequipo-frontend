import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { BlogAdminTable } from '@/publication/domain/BlogAdminTable';
import responseAdminBlogTableMock from '@/publication/infrastructure/mocks/responseAdminBlogTableMock.json';
import type { RequestSavePublication } from '@/publication/infrastructure/models/requests/RequestSavePublication';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { mapPageableResponseToBlogAdminTable } from '@/publication/infrastructure/services/publicationService';

const keysMap = {
  creationDate: 'creationDate',
};

async function Api(
  publication: RequestSavePublication,
  filters: Pageable
): Promise<PageableResponse<ResponsePublication>> {
  const response = await api.post<PageableResponse<ResponsePublication>>('/blog', publication, {
    params: createPageParams(filters, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponsePublication>> {
  await UtilBase.wait(500);

  return responseAdminBlogTableMock as PageableResponse<ResponsePublication>;
}

async function savePublication(
  publication: RequestSavePublication,
  filters: Pageable
): Promise<BlogAdminTable> {
  try {
    const response = UtilBase.checkEnvironment()
      ? await InMemory()
      : await Api(publication, filters);

    return mapPageableResponseToBlogAdminTable(response);
  } catch (error) {
    throw new Error(`Error saving/updating publication`);
  }
}

export { savePublication };
