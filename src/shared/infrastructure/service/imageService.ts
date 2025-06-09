import type { ImageView } from '@/shared/dominio/ImageView';
import type { RequestImage } from '@/shared/infrastructure/models/RequestImage';
import type { ResponseImage } from '@/shared/infrastructure/models/ResponseImage';

export function mapResponseImageToImageView(resp: ResponseImage): ImageView {
  return {
    id: resp.id,
    name: resp.name,
    url: resp.url,
  };
}

export function mapImageViewToRequestImage(image: ImageView): RequestImage {
  return {
    id: image.id,
    name: image.name,
    url: image.url,
  };
}
