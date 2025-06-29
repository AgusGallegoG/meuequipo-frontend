import type { ImageView } from '@/shared/dominio/ImageView';
import type { RequestImage } from '@/shared/infrastructure/models/requests/RequestImage';
import type { ResponseImage } from '@/shared/infrastructure/models/responses/ResponseImage';

const BASE_IMAGE_SERVE_URL = import.meta.env.VITE_API_URL + '/images/serve/';

export function mapResponseImageToImageView(resp: ResponseImage): ImageView {
  return {
    id: resp.id,
    name: resp.name,
    url: BASE_IMAGE_SERVE_URL + resp.id,
  };
}

export function mapImageViewToRequestImage(image: ImageView): RequestImage {
  return {
    id: image.id,
    name: image.name,
  };
}
