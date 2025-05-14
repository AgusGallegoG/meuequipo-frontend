import type { FooterInfo } from '@/core/dominio/FooterInfo';
import type { ResponseFooterResourcesList } from '@/core/infrastructure/models/ResponseFooterResourcesList';

async function Load(): Promise<ResponseFooterResourcesList> {
  const result = await fetch('/cbxuventude/footer/resources.json');
  return await result.json();
}

async function getFooterResources(): Promise<FooterInfo> {
  try {
    return await Load();
  } catch (error) {
    throw new Error(`El archivo /footer/resources.json no se encuentra en /public`);
  }
}

export { getFooterResources };
