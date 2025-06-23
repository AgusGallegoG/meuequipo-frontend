import type { CategoryItem } from '@/category/domain/CategoryTable';
import getCategoryTableMock from '@/category/infrastructure/mocks/getCategoryTableMock.json';
import type { RequestSaveCategory } from '@/category/infrastructure/models/request/RequestSaveCategory';
import type { ResponseCategory } from '@/category/infrastructure/models/response/ResponseCategoryTable';
import { createCategoryItemFromResponseCategory } from '@/category/infrastructure/service/categoryService';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';

async function Api(category: RequestSaveCategory): Promise<ResponseCategory> {
  const response = await api.post<ResponseCategory>('/category', category);
  return response.data;
}
async function InMemory(): Promise<ResponseCategory> {
  await UtilBase.wait(500);
  return getCategoryTableMock.data[0] as ResponseCategory;
}
async function saveCategory(category: RequestSaveCategory): Promise<CategoryItem> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(category);

    return createCategoryItemFromResponseCategory(response);
  } catch (error) {
    throw new Error('Error updating/creating category');
  }
}

export { saveCategory };
