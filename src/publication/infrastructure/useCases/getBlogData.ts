import type { FilterParams } from '@/core/dominio/Pageable';
import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { PublicationNews } from '@/publication/domain/Publication';
import responseAdminBlogTableMock from '@/publication/infrastructure/mocks/responseAdminBlogTableMock.json';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import { mapResponsePageableToPublicationNews } from '@/publication/infrastructure/services/publicationService';

async function Api(filters: FilterParams): Promise<PageableResponse<ResponsePublication>> {
  const response = await api.get<PageableResponse<ResponsePublication>>('/blog', {
    params: filters,
  });

  return response.data;
}

async function InMemory(): Promise<PageableResponse<ResponsePublication>> {
  await UtilBase.wait(500);
  return responseAdminBlogTableMock as PageableResponse<ResponsePublication>;
}

async function getBlogData(filters: FilterParams): Promise<PublicationNews> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(filters);

    return mapResponsePageableToPublicationNews(response);
  } catch (error) {
    throw new Error('Error obteniendo datos de novidades');
  }
}

export { getBlogData };
