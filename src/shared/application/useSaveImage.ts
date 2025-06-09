import { useMeToast } from '@/core/hooks/useMeToast';
import { useI18n } from 'vue-i18n';
import type { ImageUpload } from '../dominio/ImageUpload';
import { saveImage } from '../infrastructure/useCases/SaveImage';

// metodo para el post de la imagen, devuelve el imageView con la url para cargar la imagen del server
export function useSaveImage() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();
  const { showToast } = useMeToast();

  async function refetch(image: ImageUpload) {
    loading.value = true;
    try {
      return await saveImage(image);
    } catch (error) {
      showToast({
        title: t('core.image'),
        message: t('toast.messages.errors.upload_error', [t('core.image').toLowerCase()]),
        severity: 'error',
      });
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
