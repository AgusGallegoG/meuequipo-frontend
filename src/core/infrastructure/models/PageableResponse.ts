export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PageableResponse<T> {
  content: T[];
  page: PageInfo;
}
