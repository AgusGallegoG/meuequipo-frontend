// Utilidad para usar en métodos aos que queremos engadir o pageLoader
import { usePageLoaderStore } from '@/shared/store/pageLoaderStore';

export async function withLoading<T>(action: () => Promise<T>, message?: string): Promise<T> {
  const loader = usePageLoaderStore();
  loader.showLoading(message);
  try {
    return await action();
  } finally {
    loader.hideLoading();
  }
}
