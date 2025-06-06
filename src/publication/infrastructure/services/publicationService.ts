import type { Publication } from '@/publication/domain/Publication';
import type { Image } from '@/shared/dominio/Image';
import type { ImageView } from '@/shared/dominio/ImageView';
import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';
import type {
  ResponsePublication,
  ResponsePublicationList,
} from '../models/responses/ResponsePublicationList';

// Función para mapear un único ResponseImage a Image
function mapResponseImageToImage(responseImage: ResponseImage): ImageView {
  return {
    name: responseImage.name,
    url: responseImage.url,
  };
}

// Función para mapear un array de ResponseImage a un array de Image
function mapResponseImagesToImages(responseImages: ResponseImage[]): ImageView[] {
  return responseImages.map(mapResponseImageToImage);
}

// Función para mapear un único ResponsePublication a Publication
function mapResponsePublicationToPublication(responsePub: ResponsePublication): Publication {
  return {
    id: responsePub.id,
    title: responsePub.title,
    body: responsePub.body,
    creationDate: responsePub.creationDate,
    images: mapResponseImagesToImages(responsePub.images),
  };
}

// Función para mapear un ResponsePublicationList a un array de Publication
export function createPublicationListFromResponsePublicationList(
  response: ResponsePublicationList
): Publication[] {
  return response.content.map(mapResponsePublicationToPublication);
}
