import type { Pageable } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import { createPageParams } from '@/core/infrastructure/service/PageableService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { BlogAdminTable } from '@/publication/domain/BlogAdminTable';
import responseAdminBlogTableMock from '@/publication/infrastructure/mocks/responseAdminBlogTableMock.json';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { mapPageableResponseToBlogAdminTable } from '../services/publicationService';

const keysMap = {
  creationDate: 'createdDate',
};

async function Api(filter: Pageable): Promise<PageableResponse<ResponsePublication>> {
  const response = await api.get<PageableResponse<ResponsePublication>>('/blog/admin', {
    params: createPageParams(filter, keysMap),
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponsePublication>> {
  await UtilBase.wait(500);

  return responseAdminBlogTableMock as PageableResponse<ResponsePublication>;
}

async function getBlogAdminTable(filter: Pageable): Promise<BlogAdminTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(filter);

    return mapPageableResponseToBlogAdminTable(response);
  } catch (error) {
    throw new Error(`Error fetching data for blogAdminTable`);
  }
}

export { getBlogAdminTable };
