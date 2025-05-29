import type { CategoryItem, CategoryTable } from '@/category/domain/CategoryTable';
import type { RequestSaveCategory } from '../models/request/RequestSaveCategory';
import type { ResponseCategory } from '../models/response/ResponseCategoryTable';

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
      yearEnd: cat.yearEnd ? new Date(cat.yearEnd) : null,
      yearInit: new Date(cat.yearInit),
    };
  });
}

export function createRequestSaveCategoryFromCategoryItem(
  category: CategoryItem
): RequestSaveCategory {
  return {
    id: category.id === -1 ? null : category.id,
    name: category.name,
    yearInit: category.yearInit ? category.yearInit.toISOString() : '',
    yearEnd: category.yearEnd ? category.yearEnd.toISOString() : null,
    active: category.active,
  };
}
