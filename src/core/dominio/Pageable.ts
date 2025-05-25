/* eslint-disable @typescript-eslint/no-explicit-any */
export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export type RenameKeys = {
  [frontendKey: string]: string;
};

export interface FilterParams {
  page: number;
  size: number;
  sort?: string;
}

export interface Pageable {
  rows: number;
  sortField: any;
  sortOrder: any;
  sort: any;
  page: number;
}

export const pageableDefault: Pageable = {
  rows: 10,
  sortField: null,
  sortOrder: null,
  sort: {},
  page: 0,
};
