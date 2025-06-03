import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';

export type RivalFilters = {
  pageParams: Pageable;
  categories: number[];
};

export const defaultRivalFilters: RivalFilters = {
  pageParams: { ...pageableDefault },
  categories: [],
};
