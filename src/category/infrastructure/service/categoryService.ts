import type { CategoryItem, CategoryTable } from '@/category/domain/CategoryTable';
import type { RequestSaveCategory } from '@/category/infrastructure/models/request/RequestSaveCategory';
import type { ResponseCategory } from '@/category/infrastructure/models/response/ResponseCategoryTable';
import { mapToLocaleDateString, parseBackendDate } from '@/core/utilities/UtilDate';

export function createCategoryTableFromResponseCategoryList(
  response: ResponseCategory[]
): CategoryTable {
  return {
    content: mapCategoryResponseListToCategoryItemList(response),
  };
}

function mapCategoryResponseListToCategoryItemList(response: ResponseCategory[]): CategoryItem[] {
  return response.map((cat) => {
    return {
      id: cat.id,
      active: cat.active,
      name: cat.name,
      yearInit: parseBackendDate(cat.yearInit),
      yearEnd: cat.yearEnd ? parseBackendDate(cat.yearEnd) : null,
    };
  });
}

export function createRequestSaveCategoryFromCategoryItem(
  category: CategoryItem
): RequestSaveCategory {
  return {
    id: category.id === -1 ? null : category.id,
    name: category.name,
    yearInit: category.yearInit ? mapToLocaleDateString(category.yearInit) : '',
    yearEnd: category.yearEnd ? mapToLocaleDateString(category.yearEnd) : null,
    active: category.active,
  };
}
