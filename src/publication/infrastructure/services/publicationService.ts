import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import type { BlogAdminTable } from '@/publication/domain/BlogAdminTable';
import type { Publication, PublicationNews } from '@/publication/domain/Publication';
import type { RequestSavePublication } from '@/publication/infrastructure/models/requests/RequestSavePublication';
import type { ResponsePublication } from '@/publication/infrastructure/models/responses/ResponsePublicationList';
import type { ImageView } from '@/shared/dominio/ImageView';
import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';
import {
  mapImageViewToRequestImage,
  mapResponseImageToImageView,
} from '@/shared/infrastructure/service/imageService';

// Función para mapear un array de ResponseImage a un array de Image
function mapResponseImagesToImages(responseImages: ResponseImage[]): ImageView[] {
  return responseImages.map(mapResponseImageToImageView);
}

// Función para mapear un único ResponsePublication a Publication
function mapResponsePublicationToPublication(responsePub: ResponsePublication): Publication {
  return {
    id: responsePub.id,
    title: responsePub.title,
    body: responsePub.body,
    creationDate: responsePub.creationDate,
    images: responsePub.images ? mapResponseImagesToImages(responsePub.images) : null,
  };
}

// Función para mapear un ResponsePublicationList a un array de Publication
export function createPublicationListFromResponsePublicationList(
  response: ResponsePublication[]
): Publication[] {
  return response.map(mapResponsePublicationToPublication);
}

export function mapPageableResponseToBlogAdminTable(
  response: PageableResponse<ResponsePublication>
): BlogAdminTable {
  return {
    content: createPublicationListFromResponsePublicationList(response.content),
    totalRecords: response.totalElements,
  };
}

export function createRequestSavePublicationFromPublication(
  pub: Publication
): RequestSavePublication {
  return {
    id: pub.id === -1 ? null : pub.id,
    body: pub.body,
    title: pub.title,
    images: pub.images
      ? pub.images.map((i) => {
          return mapImageViewToRequestImage(i);
        })
      : null,
  };
}

export function mapResponsePageableToPublicationNews(
  response: PageableResponse<ResponsePublication>
): PublicationNews {
  return {
    content: createPublicationListFromResponsePublicationList(response.content),
    totalRecords: response.totalElements,
  };
}
