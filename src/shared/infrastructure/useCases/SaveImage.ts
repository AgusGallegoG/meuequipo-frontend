import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { ImageUpload } from '@/shared/dominio/ImageUpload';
import type { ImageView } from '@/shared/dominio/ImageView';
import type { ResponseImage } from '../models/responses/ResponseImage';
import { mapResponseImageToImageView } from '../service/imageService';

async function Api(image: ImageUpload): Promise<ResponseImage> {
  const formData = new FormData();
  formData.append('file', image.file);
  const response = await api.post<ResponseImage>('/images/save', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

async function InMemory(image: ImageUpload): Promise<ResponseImage> {
  const { file } = image;
  debugger;

  if (!(file instanceof File)) {
    console.error('No es un File válido:', file);
    throw new Error('El archivo no es un File válido para crear una URL');
  }
  await UtilBase.wait(500);
  return {
    id: Date.now(),
    name: file.name,
  };
}

async function saveImage(image: ImageUpload): Promise<ImageView> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory(image) : await Api(image);

    return mapResponseImageToImageView(response);
  } catch (error) {
    throw new Error(`Error uploading single image`);
  }
}

export { saveImage };
