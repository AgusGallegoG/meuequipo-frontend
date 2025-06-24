import type { Pageable } from '@/core/dominio/Pageable';

export type SigninFilters = {
  categoryId: number | null;
  signinState: number | null;
  lazyParams: Pageable;
};

export const defaultSigninFilters: SigninFilters = {
  categoryId: null,
  signinState: null,
  lazyParams: {
    rows: 10,
    sortField: null,
    sortOrder: null,
    sort: {},
    page: 0,
  },
};
