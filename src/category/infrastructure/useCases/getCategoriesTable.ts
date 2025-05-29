import type { CategoryTable } from '@/category/domain/CategoryTable';
import getCategoryTableMock from '@/category/infrastructure/mocks/getCategoryTableMock.json';
import type { ResponseCategory } from '@/category/infrastructure/models/response/ResponseCategoryTable';
import { createCategoryTableFromResponseCategoryList } from '@/category/infrastructure/service/categoryService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';

async function Api(): Promise<ResponseCategory[]> {
  const response = await api.get<ResponseCategory[]>('/category');
  return response.data;
}

async function InMemory(): Promise<ResponseCategory[]> {
  await UtilBase.wait(500);
  return getCategoryTableMock.data as ResponseCategory[];
}

async function getCategoriesTable(): Promise<CategoryTable> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();

    return createCategoryTableFromResponseCategoryList(response);
  } catch (error) {
    throw new Error(`Error obteniendo las categorias en getCategoriesTable`);
  }
}

export { getCategoriesTable };
