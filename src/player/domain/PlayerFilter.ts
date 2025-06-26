import type { Pageable } from '@/core/dominio/Pageable';

export type PlayerFilter = {
  categoryId: number | null;
  sex: number | null;
  lazyParams: Pageable;
};

export const defaultPlayerFilters: PlayerFilter = {
  categoryId: null,
  sex: null,
  lazyParams: {
    rows: 10,
    sortField: null,
    sortOrder: null,
    sort: {},
    page: 0,
  },
};
