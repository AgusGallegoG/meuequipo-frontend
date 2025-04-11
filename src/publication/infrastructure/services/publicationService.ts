import type { Publication } from '@/publication/domain/Publication';
import type {
  ResponsePublication,
  ResponsePublicationList,
} from '../models/responses/ResponsePublicationList';
import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';
import type { Image } from '@/shared/dominio/Image';

// Función para mapear un único ResponseImage a Image
function mapResponseImageToImage(responseImage: ResponseImage): Image {
  return {
    imageB64: responseImage.imageB64,
    imageName: responseImage.imageName,
  };
}

// Función para mapear un array de ResponseImage a un array de Image
function mapResponseImagesToImages(responseImages: ResponseImage[]): Image[] {
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
