import { UtilBase } from '@/core/utilities/UtilBase';
import {
  SortOrder,
  type FilterParams,
  type Pageable,
  type RenameKeys,
} from '../../dominio/Pageable';

export function createPageParams(lazyParams: Pageable, keysMap: RenameKeys = {}): FilterParams {
  const direction = lazyParams.sortOrder > 0 ? SortOrder.ASCENDING : SortOrder.DESCENDING;

  const mappedField =
    lazyParams.sortField && !UtilBase.isObjectEmpty(lazyParams.sortField)
      ? keysMap[lazyParams.sortField]
      : '';

  return {
    page: lazyParams.page,
    size: lazyParams.rows,
    sort: mappedField ? `${mappedField},${direction}` : '',
  };
}
